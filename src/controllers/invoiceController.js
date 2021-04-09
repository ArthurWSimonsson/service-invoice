const {Invoice, PaidInvoice} = require('../models/Invoice');
const boom = require('boom');
const transactionController = require('./transactionController');
const {Saga} = require("../utils/saga");
const mongoose = require('mongoose');

exports.addInvoice = async invoice => {

    let saga = new Saga();

    let createInvoiceStep = saga.begin({name: "create invoice"});
    let updatePaymentStep = saga.begin({name: "update payment"});
    let updateInvoiceStep = saga.begin({name: "update invoice"});
    let addTransactionStep = saga.begin({name: "add transaction"});

    
    let {invoiceNr} = invoice;
    let result;

    try { result = await Invoice.findOne({invoiceNr}); }
    catch(err) { throw boom.boomify(err); }

    createInvoiceStep.onRepair = () => Invoice.deleteOne({invoiceNr});

    try {
        if (!result)
            result = await new Invoice(invoice).save();
        
        createInvoiceStep.success();
    }
    catch(err) {
        createInvoiceStep.fail(err);
        throw boom.boomify(err);
    }

    let paymentObjectId = new mongoose.Types.ObjectId();

    updatePaymentStep.onRepair = () => {
        await Invoice.updateOne (
            { _id: result._id },
            { $pull: { payments: {_id: paymentObjectId} } }
        );
    };

    try {
        await Invoice.updateOne (
            { _id: result._id },
            { $push: { payments: {amount: invoice.payment, _id: paymentObjectId} } }
        );
        updatePaymentStep.success();
    }
    catch(err) {
        updatePaymentStep.fail(err);
        throw boom.boomify(err);
    }

    let totalPayed;

    updateInvoiceStep.onRepair = () => PaidInvoice.deleteOne({invoiceNr});

    try {
        result = await Invoice.findById(result._id);
        totalPayed = result.payments.reduce((a, b) => a + b, 0);

        if (totalPayed >= invoice.total)
            await new PaidInvoice({ invoiceNr: invoiceNr, paidDate: new Date() }).save();
        updateInvoiceStep.success();
    }
    catch(err) {
        updateInvoiceStep.fail(err);
        throw boom.boomify(err);
    }


    try {
        if (totalPayed < invoice.total)
            await transactionController.addTransaction(result);
        addTransactionStep.success();
    }
    catch(err) {
        addTransactionStep.fail(err);
        throw boom.boomify(err);
    }

    return result;


    /*try {

    }
    catch(err) {
        throw boom.boomify(err);
    }*/
}

exports.getInvoices = async () => {
    try {
        const invoices = await Invoice.find();
        return invoices;
    }
    catch(err) {
        throw boom.boomify(err);
    }
}

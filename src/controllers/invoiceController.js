const {Invoice, PaidInvoice} = require('../models/Invoice');
const boom = require('boom');
const transactionController = require('./transactionController');
const {Saga} = require("../utils/saga");
const mongoose = require('mongoose');

// Adds an invoice to the invoice database.
// Applies the Saga pattern when needed.
exports.addInvoice = async invoice => {

    let saga = new Saga(); // {simulateFailure: {"create invoice": "Test error"}}

    saga.onStepFailed = (s) => console.log(s);

    
    let {invoiceNr} = invoice;
    let result;

    try { result = await Invoice.findOne({invoiceNr}); }
    catch(err) { throw err; }

    let createInvoiceStep = saga.begin({name: "create invoice"});
    createInvoiceStep.onRepair = async () => console.log( "REPAIR DEL", await Invoice.deleteOne({invoiceNr}) );

    try {
        //throw "ERROR1";
        console.log("INVOICE:", result)
        if (!result)
            result = await new Invoice(invoice).save();
        
        createInvoiceStep.success();
    }
    catch(err) {
        createInvoiceStep.fail(err);
        throw err;//boom.boomify(err);
    }

    let paymentObjectId = new mongoose.Types.ObjectId();

    let updatePaymentStep = saga.begin({name: "update payment"});
    updatePaymentStep.onRepair = () => {
        Invoice.updateOne (
            { _id: result._id },
            { $pull: { payments: {_id: paymentObjectId} } }
        );
    };

    try {
        //throw "ERROR2";
        await Invoice.updateOne (
            { _id: result._id },
            { $push: { payments: {amount: invoice.payment, _id: paymentObjectId} } }
        );
        updatePaymentStep.success();
    }
    catch(err) {
        updatePaymentStep.fail(err);
        throw err;//boom.boomify(err);
    }

    let totalPayed;

    let updateInvoiceStep = saga.begin({name: "update invoice"});
    updateInvoiceStep.onRepair = () => PaidInvoice.deleteOne({invoiceNr});

    try {
        //throw "ERROR3";
        result = await Invoice.findById(result._id);
        totalPayed = result.payments.reduce((a, b) => {return a + b.amount}, 0);
        if (totalPayed >= invoice.total, totalPayed) {
            await new PaidInvoice({ invoiceNr: invoiceNr, paidDate: new Date() }).save();
        }
        updateInvoiceStep.success();
    }
    catch(err) {
        updateInvoiceStep.fail(err);
        throw err;//boom.boomify(err);
    }


    let addTransactionResult;

    let addTransactionStep = saga.begin({name: "add transaction"});
    addTransactionStep.onRepair = () => {
        if(!addTransactionResult)
            return;
        if(addTransactionResult.new)
            transactionController.removeTransaction(result)
        else if(!addTransactionResult.new && addTransactionResult.old)
            transactionController.setTransactionAmount(addTransactionResult.old)
    };
    try {
        //throw "ERROR4";
        if (totalPayed < invoice.total) {
            addTransactionResult = (await transactionController.addTransaction(result, invoice.tagName)).data;
            console.log(addTransactionResult);
        }
        addTransactionStep.success();
    }
    catch(err) {
        addTransactionStep.fail(err);
        throw err;//boom.boomify(err);
    }


    await saga.promise();

    return result;


    /*try {

    }
    catch(err) {
        throw boom.boomify(err);
    }*/
}

// Gets all invoices.
exports.getInvoices = async () => {
    try {
        const invoices = await Invoice.find();
        return invoices;
    }
    catch(err) {
        throw err;//boom.boomify(err);
    }
}

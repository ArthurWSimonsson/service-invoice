const Invoice = require('../models/Invoice')
const boom = require('boom')
const transactionController = require('./transactionController')

exports.addInvoice = async req => {
    try {
        let invoice = req
        let invoiceNr = invoice.invoiceNr
        let result = await Invoice.findOne({invoiceNr})

        if (!result) {
            result = await new Invoice(invoice).save()
        }

        await Invoice.updateOne(
            {_id: result._id},
            {$push: {payments: invoice.payment}}
            )

        result = await Invoice.findById(result._id)
        let totalPayed = result.payments.reduce((a,b) => a + b, 0)

        if (totalPayed >= invoice.total) {
            result = await Invoice.findByIdAndUpdate({_id: result._id}, {paidDate: new Date()}, {new: true})
        }
        else {
           transactionController.addTransaction(result, 'future')
        }

        return result
    }
    catch(err) {
        throw boom.boomify(err)
    }
}

exports.getInvoices = async () => {
    try {
        const invoices = await Invoice.find()
        return invoices
    }
    catch(err) {
        throw boom.boomify(err)
    }
}

const mongoose = require('mongoose')

// Schema for an invoice
const invoiceSchema = new mongoose.Schema({
    sendDate: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    clientNr : { 
        type: Number,
        required: true
    },  
    invoiceNr: {
        type: Number,
        required: true,
        unique: true
    },
    total: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    clientUUID: {
        type: String,
        required: true
    },
    payments: [
        {
            amount: { type: Number, required: true }
        }
    ]
})

const paidInvoiceSchema = new mongoose.Schema({
    invoiceNr: {
        type: Number,
        required: true,
        unique: true
    },
    paidDate: Date
})

module.exports = { Invoice: mongoose.model('Invoice', invoiceSchema), PaidInvoice: mongoose.model('PaidInvoice', paidInvoiceSchema) }

const mongoose = require('mongoose')

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
        required: true,
        unique: true
    },
    payments: [
        {
            type: Number
        }
    ],
    paidDate: Date
})

module.exports = mongoose.model('Invoice', invoiceSchema)



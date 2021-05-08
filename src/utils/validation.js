const Joi = require("joi")

const isValidationError = (error) => {
    return Joi.isError(error)
}

// Validation schema for an invoice
const invoiceValidationSchema = Joi.object({
    sendDate: Joi.date().required(),
    dueDate: Joi.date().required(),
    clientNr : Joi.number().required(),
    invoiceNr: Joi.number().required(),
    total: Joi.number().required(),
    currency: Joi.string().required(),
    payment: Joi.number(),
    tagName: Joi.string()
})

module.exports = {
    isValidationError,
    invoiceValidationSchema
}
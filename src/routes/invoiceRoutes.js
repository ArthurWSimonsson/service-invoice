const {isValidationError,
invoiceValidationSchema } = require('../utils/validation')
const fetch = require('node-fetch');
const invoiceController = require('../controllers/invoiceController')
const exchangeController = require('../controllers/exchangeController')
const clientController = require('../controllers/clientController')
const transactionController = require('../controllers/transactionController')

const routes = async (app, options) => {
    app.post('/api/invoice', async (request, reply) => {
        try {
            let validatedInvoice = await invoiceValidationSchema.validateAsync(request.body)

            validatedInvoice = await clientController.addClientUUID(validatedInvoice)
            validatedInvoice = await exchangeController.currencyExchange(validatedInvoice)

            //await transactionController.addTransaction(validatedInvoice)

            const invoice = await invoiceController.addInvoice(validatedInvoice)

            reply.send({
                status: 200,
                msg: "Invoice valid",
                invoice: invoice
            })
        }
        catch(err) {
            if (isValidationError(err)) {
                console.log(err)
                reply.code(400).send({
                    status:400,
                    msg: 'Invoice invalid - validation',
                    err: err.msg
                })
            }
            reply.code(400).send({
                status:400,
                msg: 'Invoice invalid - route',
                err: err,
                message: err.message
            })
        }
    })
}



module.exports = routes
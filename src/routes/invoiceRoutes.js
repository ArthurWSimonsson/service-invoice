const {isValidationError,
invoiceValidationSchema } = require('../utils/validation')
const fetch = require('node-fetch');
const invoiceController = require('../controllers/invoiceController')
const clientController = require('../controllers/clientController')
const transactionController = require('../controllers/transactionController')

// Defines the route for handling invoice requests.
const routes = async (app, options) => {
    app.post('/api/invoice', async (request, reply) => {
        try {
            let validatedInvoice = await invoiceValidationSchema.validateAsync(request.body)

            console.log(validatedInvoice)

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
                    err: err
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
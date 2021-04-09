const fetch = require('node-fetch');

exports.currencyExchange = async (invoice) => {
    // const exchangeRate = await fetch(`https://api.exchangeratesapi.io/latest?symbols=${invoice.currency}`)
    /*const exchangeRate = await fetch(`https://v6.exchangerate-api.com/v6/8cf8a7fdc4284f544d05268d/latest/${invoice.currency}`)
    .then(res => res.json())
    .then(res => res)



    // console.log('exRate is ', exchangeRate)

    invoice.total = invoice.total * exchangeRate.conversion_rates['EUR']
    if (invoice.payment)
        invoice.payment = invoice.payment * exchangeRate.conversion_rates['EUR']
    invoice.currency = 'EUR'

    // console.log('exInvoice is ', invoice)*/

    return invoice
}
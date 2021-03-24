const fetch = require('node-fetch');

exports.currencyExchange = async (invoice) => {
    const exchangeRate = await fetch(`https://api.exchangeratesapi.io/latest?symbols=${invoice.currency}`)
    .then(res => res.json())
    .then(res => res)

    // console.log('exRate is ', exchangeRate)

    invoice.total = invoice.total / exchangeRate.rates[invoice.currency]
    if (invoice.payment)
        invoice.payment = invoice.payment / exchangeRate.rates[invoice.currency]
    invoice.currency = exchangeRate.base

    // console.log('exInvoice is ', invoice)

    return invoice
}
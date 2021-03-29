const fetch = require('node-fetch');

exports.addTransaction = async(invoice, status = 'payed') => {

    // if (status === 'future') {
    //     invoice.future = true
    //     console.log('invoice is ', invoice)
    // }

    const result = await fetch('http://transaction:1002/api/transaction', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(invoice)
  });
}

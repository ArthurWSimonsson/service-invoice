const fetch = require('node-fetch');

exports.addTransaction = async(invoice, status = 'payed') => {

    // if (status === 'future') {
    //     invoice.future = true
    //     console.log('invoice is ', invoice)
    // }

    const result = await fetch('http://localhost:3004/api/transaction', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(invoice)
  });
}

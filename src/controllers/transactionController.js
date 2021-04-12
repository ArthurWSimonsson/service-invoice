const fetch = require('node-fetch');

exports.addTransaction = async(invoice) => {

    // if (status === 'future') {
    //     invoice.future = true
    //     console.log('invoice is ', invoice)
    // }

    await fetch('http://localhost:3004/api/transaction', {
      // const result = await fetch('http://transaction:1002/api/transaction', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(invoice)
  });
}

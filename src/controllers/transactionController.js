const fetch = require('node-fetch');

// Does a request to the transaction service to add a transaction.
exports.addTransaction = async(invoice) => {

    // return await fetch('http://localhost:3004/api/transaction', {
    return await fetch('http://transaction:1002/api/transaction', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(invoice)
  });
}

// Does a request to the transaction service to delete a transaction.
exports.removeTransaction = async(invoice) => {

    // return await fetch('http://localhost:3004/api/transaction', {
    return await fetch('http://transaction:1002/api/transaction', {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(invoice)
  });
}

// Does a request to the transaction service to change the amount of a transaction
exports.setTransactionAmount = async(invoice) => {

    // return await fetch('http://localhost:3004/api/transaction/amount/set', {
    return await fetch('http://transaction:1002/api/transaction/amount/set', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(invoice)
  });
}

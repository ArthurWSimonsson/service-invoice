const fetch = require('node-fetch');
require("dotenv").config();

// Does a request to the transaction service to add a transaction.
exports.addTransaction = async (invoice, tagName) => {

    let res = await fetch(process.env.TRANSACTION_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({...invoice, tagName})
  })
  let result = await res.json();

  if(result.status != 200 || result.err) {
    throw result.err;
  }
  return result;
}

// Does a request to the transaction service to delete a transaction.
exports.removeTransaction = async(invoice) => {

    return await fetch(process.env.TRANSACTION_URL, {
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

    return await fetch(process.env.TRANSACTION_URL + 'amount/set', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(invoice)
  });
}

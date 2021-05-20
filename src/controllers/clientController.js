const fetch = require('node-fetch');
require("dotenv").config();

// Fetches client uuid from client service and adds it to the invoice
exports.addClientUUID = async (invoice) => {
    try{
        const result = await fetch(process.env.CLIENT_URL + invoice.clientNr)
        // const result = await fetch(`http://client:1001/api/client/${invoice.clientNr}`)
        .then(res => res.json())
        .then(res => res)

        if(result.status >= 300 || result.error)
            throw result.error;

        invoice.clientUUID = result.client.clientUUID;
    }
    catch(err) {
        throw err;
    }
    return invoice;
}

exports.deleteClient = async (invoice) => {
    return await fetch(process.env.CLIENT_URL, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(invoice)
      });
}


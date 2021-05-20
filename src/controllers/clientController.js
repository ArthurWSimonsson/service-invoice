const fetch = require('node-fetch');

// Fetches client uuid from client service and adds it to the invoice
exports.addClientUUID = async (invoice) => {
    try{
        const result = await fetch(`http://localhost:3003/api/client/${invoice.clientNr}`)
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
    return await fetch(`http://localhost:3003/api/client/`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(invoice)
      });
}


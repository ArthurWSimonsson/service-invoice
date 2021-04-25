const fetch = require('node-fetch');

// Fetches client uuid from client service and adds it to the invoice
exports.addClientUUID = async (invoice) => {
    // const result = await fetch(`http://localhost:3003/api/client/${invoice.clientNr}`)
    const result = await fetch(`http://client:1001/api/client/${invoice.clientNr}`)
    .then(res => res.json())
    .then(res => res)
    
    invoice.clientUUID = await result.client.clientUUID

    return invoice
}


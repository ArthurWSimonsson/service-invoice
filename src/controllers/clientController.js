const fetch = require('node-fetch');

exports.addClientUUID = async (invoice) => {
    const result = await fetch(`http://localhost:3003/api/client/${invoice.clientNr}`)
    .then(res => res.json())
    .then(res => res)
    
    invoice.clientUUID = result.client.clientUUID

    return invoice
}


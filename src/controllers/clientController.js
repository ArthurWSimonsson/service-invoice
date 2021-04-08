const fetch = require('node-fetch');

exports.addClientUUID = async (invoice) => {
    const result = await fetch(`http://localhost:3003/api/client/${invoice.clientNr}`)
    // const result = await fetch(`http://client:1001/api/client/${invoice.clientNr}`)
    .then(res => res.json())
    .then(res => res)
    
    invoice.clientUUID = await result.client.clientUUID

    return invoice
}


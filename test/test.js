const { doesNotMatch } = require('assert');
const assert = require('assert');
const invoiceController = require('../src/controllers/invoiceController')

let mockedInvoice = {
    sendDate: '2021-01-01',
    dueDate: '2021-02-01',
    clientNr: 5,
    invoiceNr: 6,
    total: 100000,
    currency: 'SEK',
    payment: 50,
    clientUUID: '03b29777-d253-4206-b10d-14ae3ecf29a4'
  }

describe('Saga', () => {
  describe('invoiceController', () => {
    it('should fail without input', async () => {
      try {
        await invoiceController.addInvoice();
      }
      catch(err) {
        assert(err != null);
      }
    })
    it('should succeed with correct input', async () => {
      try {
        let result = await invoiceController.addInvoice(mockedInvoice);
        console.log(result)
        done()
      }
      catch(err) {
        console.log('err', err)
      }
    })
  }) 
})
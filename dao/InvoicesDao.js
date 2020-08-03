const qBAuth = require('./QBAuth')

const save = (companyId,data) => {
    return new Promise((resolve,reject) => {

      qBAuth.getQuickbookCompanyAuth(companyId).then((qbo) => {
        qbo.createInvoice(data,
          function (e, searchResults) {
            if(e)
                return reject("error in saving Invoice")
            invoice = searchResults;
            console.log(invoice);
            resolve(invoice);
        });
      });
      
      })
  }
  
  
  module.exports = {
    save,
  }
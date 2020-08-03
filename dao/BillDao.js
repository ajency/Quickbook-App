const qBAuth = require('../QBAuth')

const save = (companyId,data) => {
    return new Promise((resolve,reject) => {

      qBAuth.getQuickbookCompanyAuth(companyId).then((qbo) => {
        qbo.createBill(data,
          function (e, searchResults) {
            if(e)
            {
              console.log(e);
              return reject("error in saving Bill")
            }
                
            bill = searchResults;
            console.log(bill);
            resolve(bill);
        });
      });
      
      })
  }
  
  
  module.exports = {
    save,
  }
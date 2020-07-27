const qBAuth = require('./QBAuth')

const save = (companyId,data) => {
    return new Promise((resolve,reject) => {
      
      var qbo =  qBAuth.getQuickbookCompanyAuth(companyId);
      qbo.createBill(data,
          function (e, searchResults) {
            if(e)
                return reject("error in saving Bill")
            bill = searchResults;
            console.log(bill);
            resolve(bill);
        });
    
    
      })
  }
  
  
  module.exports = {
    save,
  }
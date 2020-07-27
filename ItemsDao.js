const qBAuth = require('./QBAuth')

const findAll = (companyId) => {
    return new Promise((resolve,reject) => {
      
      var qbo =  qBAuth.getQuickbookCompanyAuth(companyId);
      qbo.findItems({
        fetchAll: true
        },
          function (e, searchResults) {
            if(e)
                return reject("error in getting Items")
            items = searchResults.QueryResponse.Item;
            console.log(items);
            resolve(items);
        });
    
    
      })
  }
  
  
  module.exports = {
      findAll,
  }
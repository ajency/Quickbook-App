const qBAuth = require('../QBAuth')

const findAll = (companyId) => {
    return new Promise((resolve,reject) => {

      qBAuth.getQuickbookCompanyAuth(companyId).then((qbo) => { 
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
      });

      })
  }


  const findByName = (companyId,name) =>{
    return new Promise((resolve,reject) => {
  
      qBAuth.getQuickbookCompanyAuth(companyId).then((qbo) => { 
        qbo.findItems({
          FullyQualifiedName: name
        }, function (e, searchResults) {
           if(e)
              return reject("error in getting Item")
          item = searchResults.QueryResponse.Item;
          console.log(item);
          resolve(item);
      });
      });
    });
  }
  
  
  module.exports = {
      findAll,
      findByName,
  }
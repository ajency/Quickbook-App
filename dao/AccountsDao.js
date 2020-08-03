const qBAuth = require('./QBAuth')

const findAll = (companyId) => {
    return new Promise((resolve,reject) => {
      
      qBAuth.getQuickbookCompanyAuth(companyId).then((qbo) => {
        qbo.findAccounts({
          fetchAll: true
          },
            function (e, searchResults) {
              if(e)
                  return reject("error in getting Accounts")
              accounts = searchResults.QueryResponse.Account;
              console.log(accounts);
              resolve(accounts);
          });

      });
      
    
    
      })
  }

  const findByName = (companyId,name) =>{
    return new Promise((resolve,reject) => {

      qBAuth.getQuickbookCompanyAuth(companyId).then((qbo) => {
        qbo.findAccounts({
          FullyQualifiedName: name
        }, function (e, searchResults) {
          if(e)
              return reject("error in getting account")
          account = searchResults.QueryResponse.Account;
          console.log(account);
          resolve(account);
      });
      });

    })
  }
  
  
  module.exports = {
      findAll,
      findByName,
  }
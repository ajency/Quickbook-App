const accountsDao =  require('../dao/AccountsDao')

const findAllAccounts = (companyId) => {
    return new Promise((resolve,reject) => {
      var accountsList = [];
      accountsDao.findAll(companyId).then((accounts) =>{
        if(accounts  && accounts.length > 0 )
        {
          accounts.forEach(function(account) {
            accountsList.push(account.FullyQualifiedName);  
         });
         resolve(accountsList);
        }
        else{
          return reject("no Data available")
        }
      });
    })
    
  }
  
  const test = (request,response) => {
    console.log(request.query.companyId);
    findAllAccounts(request.query.companyId).then((accountsList) => {
      response.status(200).json(accountsList);
    })
    
  }
  
  module.exports = {
    findAllAccounts,
    test,
  }
const qBAuth = require('./QBAuth')

const findAll = (companyId) => {
    return new Promise((resolve,reject) => {

      qBAuth.getQuickbookCompanyAuth(companyId).then((qbo) => { 
        qbo.findCustomers({
          fetchAll: true
          },
            function (e, searchResults) {
              if(e)
                  return reject("error in getting Customers")
              customers = searchResults.QueryResponse.Customer;
              console.log(customers);
              resolve(customers);
          });
      });

      })
  }


  const findByName = (companyId,name) =>{
    return new Promise((resolve,reject) => {
  
      qBAuth.getQuickbookCompanyAuth(companyId).then((qbo) => { 
        qbo.findCustomers({
            FullyQualifiedName: name
        }, function (e, searchResults) {
           if(e)
              return reject("error in getting Customers")
        customer = searchResults.QueryResponse.Customer;
        console.log(customer);
        resolve(customer);
      });
      });
    });
  }
  
  
  module.exports = {
      findAll,
      findByName,
  }
const qBAuth = require('./QBAuth')

//const findAll = (companyId) => 
/* const findAll = (request,response) =>
{
  var companyId =  request.query.companyId
  var vendors = null;
  var qbo =  qBAuth.getQuickbookCompanyAuth(companyId);
  qbo.findVendors({
        limit: 100
      },
        function (e, searchResults) {
        vendors = searchResults.QueryResponse.Vendor;
        console.log(vendors);
        response.status(200).json(vendors);
      });
} */

const findAll = (companyId) => {
  return new Promise((resolve,reject) => {
    
    var qbo =  qBAuth.getQuickbookCompanyAuth(companyId);
    qbo.findVendors({
      fetchAll: true
      },
        function (e, searchResults) {
          if(e)
          return reject("error in getting vendor")
        vendors = searchResults.QueryResponse.Vendor;
        console.log(vendors);
        resolve(vendors);
      });
  
  
    })
}


const findByName = (companyId,name) =>{
  return new Promise((resolve,reject) => {

    var qbo =  qBAuth.getQuickbookCompanyAuth(companyId);
    qbo.findVendors({
      DisplayName: name
    }, function (e, searchResults) {
      if(e)
          return reject("error in getting account")
      vendor = searchResults.QueryResponse.Vendor;
      console.log(vendor);
      resolve(vendor);
  });
  })
}



module.exports = {
    findAll,
    findByName
}
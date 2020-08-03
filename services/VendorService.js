const vendorDao =  require('../dao/VendorDao')

const findAllVendors = (companyId) => {
  return new Promise((resolve,reject) => {
    var vendorsList = [];
    vendorDao.findAll(companyId).then((vendors) =>{
      if(vendors  && vendors.length > 0 )
      {
        vendors.forEach(function(vendor) {
        vendorsList.push(vendor.DisplayName);  
       });
       resolve(vendorsList);
      }
      else{
        return reject("no Data available")
      }
    });
  })
  
}

const test = (request,response) => {
  console.log(request.query.companyId);
  findAllVendors(request.query.companyId).then((vendorsList) => {
    response.status(200).json(vendorsList);
  })
  
}

module.exports = {
  findAllVendors,
  test,
}
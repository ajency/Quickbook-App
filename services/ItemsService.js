const itemsDao =  require('./ItemsDao')

const findAllItems = (companyId) => {
    return new Promise((resolve,reject) => {
      var itemsList = [];
      itemsDao.findAll(companyId).then((items) =>{
        if(items  && items.length > 0 )
        {
            items.forEach(function(item) {
            itemsList.push(item.FullyQualifiedName);  
         });
         resolve(itemsList);
        }
        else{
          return reject("no Data available")
        }
      });
    })
    
  }
  
  const test = (request,response) => {
    console.log(request.query.companyId);
    findAllItems(request.query.companyId).then((items) => {
      response.status(200).json(items);
    })
    
  }
  
  module.exports = {
    findAllItems,
    test,
  }
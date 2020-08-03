const Response = require('../Response')
const vendorService =  require('./VendorService')
const accountService = require('./AccountsService')

function validateFields (transactionType,accountingDriver,transactionData)
{

    return new Promise((resolve,reject) => {
        let response = new Response(401,"","");
   
        if(!transactionType)
        {
            response.setMessage("Transaction type is missing");
            return resolve(response);
        }
    
        if(transactionData)
        {
            transactionData.forEach(function(transaction) {
    
            if(!transaction.vendorName) // check for empty vendor name
            {
                response.setMessage("Vendor Name is empty");
                return resolve(response);
            }
            response.setStatusCode(200)
            var lineItems = transaction.line;
        
            if(lineItems && lineItems.length > 0)
            {
                lineItems.forEach(function(item) {
               
                    if(!item.detailType)
                    {
                        response.setStatusCode(401);
                        response.setMessage("detail type not available");
                        return resolve(response);
                    }
                         
        
                    if(item.accountRef)
                        {
                            if(!item.accountRef.name)
                            {
                                response.setStatusCode(401);
                                response.setMessage("Account name is missing");
                                return resolve(response);
                            }
                            if(!item.amount)
                            {
                                response.setStatusCode(401);
                                response.setMessage("Amount is missing");
                                return resolve(response);
                            }
                               
                        }
                     
                 });
                 return resolve(response);
            }
            else
                {
                    response.setMessage("line items not available");
                    return resolve(response);
                }
    
            });
    
            return  resolve(response);
    
        }
        response.setStatusCode(200);
        return resolve(response);
    })
    
}

const ValidateData = (companyId,transactionType,accountingDriver,transactionData) => {

    return new Promise((resolve,reject) => {
    let response = new Response(200,"","");

    if(transactionType.toUpperCase() === "BILL")
    {
        vendorService.findAllVendors(companyId).then((vendors) => {
            transactionData.forEach(function(transaction) {
                if(!vendors.includes(transaction.vendorName)){
                    response.setMessage("Vendor "+transaction.vendorName+" does not exist. Please select one of the vendor from the given list");
                    response.setData(vendors);
                    response.setStatusCode(401);
                    return resolve(response);
                }
                
                var lineItems = transaction.line;
                lineItems.forEach(function(lineItem) {
            
                    if(lineItem.detailType === 'AccountBasedExpenseLineDetail')
                    {
                        accountService.findAllAccounts(companyId).then((accounts) => {
                            if(!accounts.includes(lineItem.accountRef.name) ){
                                response.setMessage("Account "+lineItem.accountRef.name+" does not exist. Please select one of the account from the given list");
                                response.setStatusCode(401);
                                response.setData(accounts);
                                return resolve(response); 
                            }
                            else
                            response.setStatusCode(200);
                        })
                        
                    }
                            
                    });
                
             });
        })

        resolve(response);   
    }
    })
    
    // return response;
}

module.exports = {
    validateFields,
    ValidateData,
}
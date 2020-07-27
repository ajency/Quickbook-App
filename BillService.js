const billDao =  require('./BillDao')
const accountsDao = require('./AccountsDao')
const vendorDao = require('./VendorDao')

 const createBill = (companyId,transaction) => {

    return new Promise((resolve,reject) => {
        var vendorId = null;
        var accountId = null;
        vendorDao.findByName(companyId,transaction.vendorName).then((vendor) =>{
         vendorId = vendor[0].Id

         accountsDao.findByName(companyId,transaction.line[0].accountRef.name).then((account) =>{
         accountId = account[0].Id
         
         const bill ={
            Line:[
                {
                    DetailType: transaction.line[0].detailType,
                    Amount: transaction.line[0].accountRef.amount,
                    Id:1,
                    AccountBasedExpenseLineDetail:{
                        AccountRef:{
                            value:accountId
                        }
                    }
                }
            ],
            VendorRef: {
                value: vendorId 
            }
        }
    
        billDao.save(companyId,bill).then((bill) =>{
            console.log(bill)
            resolve(bill)
            
        })

        })


        })
    
        
    
        

        

    })
   

}

module.exports = {
    createBill,
}
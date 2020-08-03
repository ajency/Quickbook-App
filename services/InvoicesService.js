const invoiceDao =  require('./InvoicesDao')
const customerDao = require('./CustomerDao')
const itemsDao = require('./ItemsDao')
const batchDao = require('./BatchDao')


 const createInvoice = (companyId,transaction,sessionId) => {

    return new Promise((resolve,reject) => {
        var customerId = null;
        var itemId = null;
        itemsDao.findByName(companyId,transaction.line[0].salesItemRef.name).then((item) =>{
        itemId = item[0].Id

        customerDao.findByName(companyId,transaction.customerName).then((customer) =>{
        customerId = customer[0].Id
         
         const invoice ={
            Line:[
                {
                    DetailType: transaction.line[0].detailType,
                    Amount: transaction.line[0].amount,
                    SalesItemLineDetail:{
                        ItemRef:{
                            value:itemId
                        }
                    }
                }
            ],
            CustomerRef: {
                value: customerId 
            }
        }
    
        invoiceDao.save(companyId,invoice).then((invoices) =>{
            console.log(invoices)
            resolve(invoices)
            
        })

        })


        })
    
        
    
        

        

    })
   

}

const prepareBulkInvoiceData = (companyId,allTransactions,sessionId) => {

    var batchedData = [];

    Promise.all(allTransactions.map(function(transaction) {     // for every invoice 

        var customerId = null;
        var itemId = null;
        var counter = 1;

        customerDao.findByName(companyId,transaction.customerName).then((customer) =>{
            customerId = customer[0].Id

            var invoiceLineItems = [];
            Promise.all(transaction.line.map(function(lineItem){         //for every line item of invoice

                itemsDao.findByName(companyId,lineItem.salesItemRef.name).then((qbitem) =>{
                    itemId = qbitem[0].Id
            
                    var qbLineItemData = {
                        DetailType: lineItem.detailType,
                        Amount: lineItem.amount,
                        SalesItemLineDetail:{
                            ItemRef:{
                                name:qbitem[0].Name,
                                value:itemId
                            }
                        }
                    };

                    invoiceLineItems.push(qbLineItemData);

                    })

            })).then((data) =>{
                var invoice = {
                    CustomerRef: {
                    value: customerId 
                },
                Line : invoiceLineItems
            };

            var batchRow = {
                Invoice : invoice,
                bId : "bid"+batchedData.length,
                operation : "create"
            };
            counter++;
            batchedData.push(batchRow);
            });
             
             
    
        }).catch(function (message) {
            console.log(message)
        });

    })).then((bulkData) => {
        batchDao.bulkImportTransactions(companyId,batchedData).then((data) => {
            console.log(data);
        });

    })

}


module.exports = {
    createInvoice,
    prepareBulkInvoiceData
}
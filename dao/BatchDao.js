const qBAuth = require('./QBAuth')

const bulkImportTransactions = (companyId,batchedTransactions) => {

    return new Promise((resolve,reject) => {
        console.log(JSON.stringify(batchedTransactions));
        qBAuth.getQuickbookCompanyAuth(companyId).then((qbo) => { 
          qbo.batch(batchedTransactions,
              function (e, searchResults) {
                if(e)
                {
                    console.log(e);
                    return reject("error in bulk import")
                }
                    
                successBatch = searchResults;
                console.log(successBatch);
                resolve(successBatch);
            });
        });
  
        })

}

module.exports ={
    bulkImportTransactions
}
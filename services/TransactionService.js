const billService =  require('./BillService')
const importHistoryTracker = require('../models/ImportHistoryTracker')
const statusEnum = require('../enums/Enums').statusEnum

const processSQSMessage = (message) =>{

    try{
        var obj = JSON.parse(message.Body);

        if(obj.transactionType.toUpperCase() === "BILL" )
        {
            importHistoryTracker.updateHistory({ 
                consumed : obj.data.length, 
                overallStatus : statusEnum.CONSUMED
             },obj.sessionId);
             
             var savedCount = 0;
             Promise.all(obj.data.map(function(dataObject) {
                billService.createBill(obj.companyId, dataObject, obj.sessionId).then((bill) => {
                    console.log(bill)
                    savedCount++;
                  })
             })).then(function(resultsArr){
                importHistoryTracker.updateHistory({ 
                    saved : savedCount,
                    overallStatus : statusEnum.SAVED
                 },obj.sessionId);
             });

        }
    }
    catch (e) {
    console.log(e)
    }
}

module.exports = {
    processSQSMessage
}
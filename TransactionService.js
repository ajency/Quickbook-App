const billService =  require('./BillService')


const processSQSMessage = (message) =>{

    try{
        var obj = JSON.parse(message.Body);

        if(obj.transactionType.toUpperCase() === "BILL" )
        {
            billService.createBill(obj.companyId,obj.data[0]).then((bill) => {
              console.log(bill)
            })
        }
    }
    catch (e) {
    console.log(e)
    }
    

   
}

module.exports = {
    processSQSMessage
}
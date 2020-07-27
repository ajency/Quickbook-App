const validation = require('./DataValidationService')
const billService =  require('./BillService')
const SQSTopic = require('./SQSTopic')
var uuid = require('uuid-random');
const sqsSendMessage = require('./SQSsendmessage')

const addBill = (request,response) => {
    var companyId  = request.query.companyId;
   /* let status = validation.validateFields(request.body.transactionType,request.body.accountingDriver,request.body.transactionData)
    if(status.getStatusCode() == 200){
        console.log("validating Data");
        //status =  validation.ValidateData(companyId,request.body.transactionType,request.body.accountingDriver,request.body.transactionData)
        validation.ValidateData(companyId,request.body.transactionType,request.body.accountingDriver,request.body.transactionData).then((status) => {

        if(status.getStatusCode() == 401)
            response.status(401).json(status);
        else
            response.status(200).json(status);
        })


    } */

   /*  billService.createBill(companyId,request.body.transactionData[0]).then((bill) => {
        response.status(200).json(bill);
    }) */
    console.log(companyId)
    let sqsTopic = new SQSTopic();
    sqsTopic.setData(request.body.transactionData);
    sqsTopic.setSessionId(uuid());
    sqsTopic.setTransactionType(request.body.transactionType);
    sqsTopic.setCompanyId(companyId);
    sqsSendMessage.publishToSQS(sqsTopic).then((message) =>{
        response.status(200).json(message);
    });
    
}

module.exports = {
    addBill,
}
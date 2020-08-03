const validation = require('./services/DataValidationService')
const billService =  require('./services/BillService')
const invoiceService = require('./services/InvoicesService')
const SQSTopic = require('./SQSTopic')
var uuid = require('uuid-random');
const sqsSendMessage = require('./SQSsendmessage')
const importHistoryTracker = require('./models/ImportHistoryTracker')

const addBill = (request,response) => {
    var companyId  = request.query.companyId;
     console.log(companyId);

     validation.validateFields(request.body.transactionType,request.body.accountingDriver,request.body.transactionData).then((status) =>{
         console.log(status);

        if(status.getStatusCode() == 200){
            console.log("validating Data");
            //status =  validation.ValidateData(companyId,request.body.transactionType,request.body.accountingDriver,request.body.transactionData)
             validation.ValidateData(companyId,request.body.transactionType,request.body.accountingDriver,request.body.transactionData).then((status) => {
                console.log(status);
            if(status.getStatusCode() == 401)
                response.status(401).json(status);
            else
            {
                var sessionIdentity = uuid();
    
                const statusEnum = {"PUBLISHED":"Published", "CONSUMED":"Consumed", "PROCESSED":"Processed", "SAVED":"Saved"}
            
                const importHistory = {
                    companyId : request.query.companyId,
                    sessionId : sessionIdentity,
                    overallStatus : statusEnum.PUBLISHED,
                    published: request.body.transactionData.length,
                    createdDate: new Date(),
                    updatedDate: new Date()
                }
            
                importHistoryTracker.createHistory(importHistory);
            
                billService.createBill(companyId,request.body.transactionData[0],sessionIdentity).then((bill) => {
                    response.status(200).json(bill);
                })
        
            }
    
            })
             
           
        }
        response.status(200).json(status);
    })
    
/* 
   var sessionIdentity = uuid();

    const statusEnum = {"PUBLISHED":"Published", "CONSUMED":"Consumed", "PROCESSED":"Processed", "SAVED":"Saved"}

    const importHistory = {
        companyId : request.query.companyId,
        sessionId : sessionIdentity,
        overallStatus : statusEnum.PUBLISHED,
        published: request.body.transactionData.length,
        createdDate: new Date(),
        updatedDate: new Date()
    }

    importHistoryTracker.createHistory(importHistory);

    billService.createBill(companyId,request.body.transactionData[0],sessionIdentity).then((bill) => {
        response.status(200).json(bill);
    }) */

   /*  console.log(companyId)
    let sqsTopic = new SQSTopic();
    sqsTopic.setData(request.body.transactionData);
    sqsTopic.setSessionId(uuid());
    sqsTopic.setTransactionType(request.body.transactionType);
    sqsTopic.setCompanyId(companyId);
    sqsSendMessage.publishToSQS(sqsTopic).then((message) =>{
        response.status(200).json(message);
    }); */
    
}

const addInvoice = (request,response) => {
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

    var sessionIdentity = uuid();

    const statusEnum = {"PUBLISHED":"Published", "CONSUMED":"Consumed", "PROCESSED":"Processed", "SAVED":"Saved"}

    const importHistory = {
        companyId : request.query.companyId,
        sessionId : sessionIdentity,
        overallStatus : statusEnum.PUBLISHED,
        published: request.body.transactionData.length,
        createdDate: new Date(),
        updatedDate: new Date()
    }

    importHistoryTracker.createHistory(importHistory);

    invoiceService.createInvoice(companyId,request.body.transactionData[0],sessionIdentity).then((invoice) => {
        response.status(200).json(invoice);
    })

   /*  console.log(companyId)
    let sqsTopic = new SQSTopic();
    sqsTopic.setData(request.body.transactionData);
    sqsTopic.setSessionId(uuid());
    sqsTopic.setTransactionType(request.body.transactionType);
    sqsTopic.setCompanyId(companyId);
    sqsSendMessage.publishToSQS(sqsTopic).then((message) =>{
        response.status(200).json(message);
    }); */

   /*  invoiceService.prepareBulkInvoiceData(companyId,request.body.transactionData,sessionIdentity)
    response.status(200).json(true);
     */
}



module.exports = {
    addBill,
    addInvoice
}
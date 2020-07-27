const { SQSURL,awsRegion,awsAccessKey,awsSecretKey } = require('./Config');
var AWS = require('aws-sdk')
const { Consumer } = require('sqs-consumer');
const transactionService = require('./TransactionService')

AWS.config.loadFromPath('config.json')

// Create an SQS service object
//var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

const consumer = Consumer.create({
  queueUrl: SQSURL,
  handleMessage: async (message) => {
    console.log(message);
    transactionService.processSQSMessage(message);
  },
  sqs: new AWS.SQS({apiVersion: '2012-11-05'})
});
 
consumer.on('error', (err) => {
  console.error(err.message);
});
 
consumer.on('processing_error', (err) => {
  console.error(err.message);
});
 


const invokeConsmerOnStart = () => {
  consumer.start();
}

module.exports ={
  invokeConsmerOnStart
}
/* 

var params = {
 AttributeNames: [
    "SentTimestamp"
 ],
 MaxNumberOfMessages: 10,
 MessageAttributeNames: [
    "All"
 ],
 QueueUrl: SQSURL,
 VisibilityTimeout: 20,
 WaitTimeSeconds: 0
};

sqs.receiveMessage(params, function(err, data) {
  if (err) {
    console.log("Receive Error", err);
  } else if (data.Messages) {
    var deleteParams = {
      QueueUrl: SQSURL,
      ReceiptHandle: data.Messages[0].ReceiptHandle
    };
    sqs.deleteMessage(deleteParams, function(err, data) {
      if (err) {
        console.log("Delete Error", err);
      } else {
        console.log("Message Deleted", data);
      }
    });
  }
}); */
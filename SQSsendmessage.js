const { SQSURL,awsRegion,awsAccessKey,awsSecretKey } = require('./Config');
var AWS = require('aws-sdk')
const Response = require('./Response')

// ,accessKeyId: awsAccessKey,accessSecretKey: awsSecretKey
//AWS.config.update({region: awsRegion });
AWS.config.loadFromPath('config.json')

var sqs = new AWS.SQS({apiVersion: '2012-11-05',});


const publishToSQS = (message) => {
    return new Promise((resolve,reject) => {
      let response = new Response(200,null,null)
        var params = {
            MessageBody: JSON.stringify(message),
            QueueUrl: SQSURL
          };

          sqs.sendMessage(params, function(err, data) {
            if (err) {
              console.log("Error", err);
              response.setMessage(err);
              return reject(response)
            } else {
              console.log("Success", data.MessageId);
              response.setMessage("Data validated successfully and pushed to quickbooks");
              resolve(response)
            }
          });
    });
}

module.exports = {
    publishToSQS,
  }
 
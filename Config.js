const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  database:process.env.database,
  dbUsername:process.env.dbUsername,
  dbPassword:process.env.dbPassword,
  dbHost:process.env.dbHost,
  dbDialect:process.env.dbDialect,
  SQSURL: process.env.QueueUrl,
  awsRegion: process.env.AWSRegion,
  awsAccessKey: process.env.AWSAccessKeyId,
  awsSecretKey: process.env.AWSsecretKey
};
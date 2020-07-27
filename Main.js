const express = require('express')
const bodyParser = require('body-parser')
const qBAuth = require('./QBAuth')
const api = require('./Api')
const vendorService = require('./VendorService')
const vendorDao = require('./VendorDao')
const accountsService = require('./AccountsService')
const itemService = require('./ItemsService')
const sqsConsumer = require('./SQSReceivemessage')
const dbConnect = require('./DbConnect')
const company = require('./models/Company')

const app = express()
const port = 3000

app.use(bodyParser.json())
/*app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)*/

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
    sqsConsumer.invokeConsmerOnStart();
    dbConnect.ConnectToDb();
    
  })

  app.get('/connectToQuickbooks', qBAuth.connectToQuickbook)

  app.get('/oauth2redirect',qBAuth.oauth2redirect)

  app.post('/addBill',api.addBill)

  //app.get('/getVendors',vendorDao.findAll)

  app.get('/getVendors1',vendorService.test)

  app.get('/getAccounts',accountsService.test)

  app.get('/getItems',itemService.test)

  app.get('/getAllCompanies',company.getAllCompanies)
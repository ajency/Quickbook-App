const OAuthClient = require('intuit-oauth')
const fs = require('fs');
var QuickBooks = require('node-quickbooks')
const companyQuickbookAccount = require('./models/CompanyQuickBookAccount')

var consumerKey = 'ABxZAeiIyXibbaWMm6D0PRxQhh7UA0hhNjs7mB0IlLTYO6vbXO';
var consumerSecret = 'AKz64F6gVQ6UL2Y8Lxhr851Dc5TBKQdc1OmauxlW';



var oAuthClient = null;

const TOKEN_PATH = 'token.json';

var id = null;

const connectToQuickbook = (request,response) => {
    oAuthClient = new OAuthClient({
        clientId: 'ABxZAeiIyXibbaWMm6D0PRxQhh7UA0hhNjs7mB0IlLTYO6vbXO',
        clientSecret: 'AKz64F6gVQ6UL2Y8Lxhr851Dc5TBKQdc1OmauxlW',
        environment: 'sandbox',                      // ‘sandbox’ or ‘production’
        redirectUri: 'http://localhost:3000/oauth2redirect'
    });
    id =  parseInt(request.query.companyId)
    var authUri = oAuthClient.authorizeUri({scope:[OAuthClient.scopes.Accounting,OAuthClient.scopes.OpenId],state: 'testState',}); 
    response.redirect(authUri);
}

const oauth2redirect = (request,response) => {
    var parseRedirect = request.url;

    oAuthClient.createToken(parseRedirect)
    .then(function(authResponse) {
        console.log('The Token is  '+ JSON.stringify(authResponse.getJson()));
        console.log(id);
        console.log('realm Id: '+request.query.realmId);
        console.log('Code: '+request.query.code);
        companyQuickbookAccount.getCompanyQuickbookAccountById(request.query.realmId).then((qBAccount) =>{

            const companyQBAccount = {
                accessToken: authResponse.getJson().access_token,
                refreshToken: authResponse.getJson().refresh_token,
                updatedDate: new Date()
            }
            companyQuickbookAccount.updateAccessAndRefreshToken(companyQBAccount,request.query.realmId);
        })
        .catch(function (message) {
            const companyQBAccount = {
                realmId : request.query.realmId,
                companyId: id,
                accessToken: authResponse.getJson().access_token,
                refreshToken: authResponse.getJson().refresh_token,
                createdDate: new Date(),
                updatedDate: new Date()
            }
            companyQuickbookAccount.createCompanyQuickbookAccount(companyQBAccount);
        })
        response.status(200).json(true);
    })
    .catch(function(e) {
        console.error("The error message is :"+e.originalMessage);
        console.error(e.intuit_tid);
        response.status(200).json(false);
    });
    
}

const getQuickbookCompanyAuth = (companyId) => { 
    return new Promise((resolve,reject) => {
        companyQuickbookAccount.getCompanyQuickbookAccountByCompanyId(companyId).then((companyQBAccount) =>{
            console.log(companyQBAccount);
            var qbo = new QuickBooks(consumerKey,
                consumerSecret,
                companyQBAccount.accessToken,
                false, // no token secret for oAuth 2.0
                companyQBAccount.realmId,
                true, // use the sandbox?
                false, // enable debugging?
                45, // set minorversion, or null for the latest version
                '2.0', //oAuth version
                companyQBAccount.refreshToken);
                resolve(qbo) ; 
        }).catch(function(message){
            reject(message);
        })

    })
 
}

module.exports = {
    connectToQuickbook,
    oauth2redirect,
    getQuickbookCompanyAuth,
  }
const OAuthClient = require('intuit-oauth')
const fs = require('fs');
var QuickBooks = require('node-quickbooks')

var consumerKey = 'ABxZAeiIyXibbaWMm6D0PRxQhh7UA0hhNjs7mB0IlLTYO6vbXO';
var consumerSecret = 'AKz64F6gVQ6UL2Y8Lxhr851Dc5TBKQdc1OmauxlW';
var oauthToken = 'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..oVrZ24gBHimPJFcOZIg8Bw.UwlQpCrMccC5s4JfK2GpGLsHqaS0BJsleK5YLn1Df028l6NrxCT2Z2wb3oulN05-WuiGYvcusmZVGQEwW5ZFWniZTwGvkJ8EEPSCusYxkGrRJENvJOTEhkSPwi-8GLEOpBhlTvGNZe_fQm-yjpi5QUlGMO7c8C3lmoCS9cHPdiGrtQQf_VRNml4rQ2O471eA62iT9wQFzWgzlTFUO6WKb3x28OUUdEal3BiilNOnwZlU8IaxUaXxVXcUrHXfX5nFt2DIvGxGyOGELQM7r8KP8nzx6Naq1C6SvqCbmeaEck0L8r1vpffb1hzmyzkPOugLcb7HxIzGIqPt-rWWvCELycY7pZxaRbkIQ7IL2ARrwunOYjgae9NbmqucKhBZZiM6LS5akyu5WGfwsYY50bLYmFBVF4EMguIWiHF0_SbhSk-xvqiXhTCGKbHRoeZHwHs-Dr_3Lp1FYFxHs_NgdGf61gC4JPhoQA-WaSsZq2jRGB2YXtVVf6OGSvfQVXHKns38pug0kpBA0cAHQyaCaaMbR4rShebqWb_FerDMlGneUBM4y6fSaTrGUurGWhmx9AwegJzQuFE3wfUbAgRZYaIhcE9EJ7YThGyMAMQ6cQD3C-qgXnycifZzyb_X1rJAQVuxxhFGlBo6KkSe1RBl7Yatz2drXr0vC-hqsIuLsFw4q1LBZXFy8OEg0VHDrCQid5h9atXP9rXzFhUsAjZ9ik7MuXMXB-ClW7lZtZ4Xq6qH0Fabd4_-E1DWqrzKqrJJrOk2GtFQiwR6ucp5aXUN24CZoFmiCgZmPFhpbHdtG4E1e5AzJRkzBaIUq2D5L8Lg0jGjYnxr_XVoH7-ESoxcbzh-Bg.ObZ_6vWEuYVyco3i7uI2oQ';
var realmId = '4620816365048196870';
var refreshToken = 'AB11604218428m2DOPbN5Cfw4NqTSWmuxIt3as5hUroxdBIB5J';



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
        fs.writeFile(TOKEN_PATH, JSON.stringify(authResponse.getJson()),(error) => {
            if (error) return console.error(error);
            console.log('Token stored to', TOKEN_PATH);
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
    var qbo = new QuickBooks(consumerKey,
        consumerSecret,
        oauthToken,
        false, // no token secret for oAuth 2.0
        realmId,
        true, // use the sandbox?
        false, // enable debugging?
        45, // set minorversion, or null for the latest version
        '2.0', //oAuth version
        refreshToken);
    return qbo;
}

module.exports = {
    connectToQuickbook,
    oauth2redirect,
    getQuickbookCompanyAuth,
  }
'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../DbConnect').sequelize

const CompanyQuickbookAccount = sequelize.define('company_quickbook_account', {
    realmId: {
     type: Sequelize.BIGINT,
     primaryKey: true,
     allowNull:false,
     field: 'realm_id'
    },
    companyId: {
      type: Sequelize.INTEGER,
      allowNull:false,
      field: 'company_id'
    },
    accessToken: {
      type: Sequelize.TEXT,
      allowNull:false,
      field: 'access_token'
    },
    refreshToken: {
      type: Sequelize.TEXT,
      allowNull:false,
      field: 'refresh_token'
    },
    createdDate:{
      type: Sequelize.DATE,
      field: 'created_date'
    }, 
    updatedDate:{
      type: Sequelize.DATE,
      field: 'updated_date'
  }
  },{
    freezeTableName: true
   });


  const getCompanyQuickbookAccountById = (id) => {
    return new Promise((resolve,reject) => {
        CompanyQuickbookAccount.findByPk(id).then(function(companyQuickbookAccount) {
            if (companyQuickbookAccount === null) {
                console.log('CompanyQuickbookAccount Not found!');
                return reject("CompanyQuickbookAccount does not exist ");
              } else {
                resolve(companyQuickbookAccount);
              }
        });
    })
   
    
  }

  const getCompanyQuickbookAccountByCompanyId = (id) => {
    return new Promise((resolve,reject) => {
        CompanyQuickbookAccount.findOne({
            where: {
                companyId: id
              }
            }).then(function(companyQuickbookAccount) {
            if (companyQuickbookAccount === null) {
                return reject("CompanyQuickbookAccount does not exist ");
              } else {
                resolve(companyQuickbookAccount);
              }
        });
    })
   
    
  }

  const createCompanyQuickbookAccount = (companyQuickbookAccount) => {
    CompanyQuickbookAccount.create(companyQuickbookAccount).then(function(companyQBAccount) {
        console.log(companyQBAccount);
       return companyQBAccount;
      })
  }


  const updateAccessAndRefreshToken = (companyQuickbookAccount,id) => {
    CompanyQuickbookAccount.update(companyQuickbookAccount,{
        where: {
            realmId: id
        }
      }).then(function(companyQBAccount) {
          return companyQBAccount;
      })
  }


  module.exports ={
    getCompanyQuickbookAccountById,
    createCompanyQuickbookAccount,
    updateAccessAndRefreshToken,
    getCompanyQuickbookAccountByCompanyId,
    CompanyQuickbookAccount
  }
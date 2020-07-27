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
      type: Sequelize.DATEONLY,
      field: 'created_date'
    }, 
    updatedDate:{
      type: Sequelize.DATEONLY,
      field: 'updated_date'
  }
  },{
    freezeTableName: true
   });
   
  async const getCompanyQuickbookAccountById = (id) => {
    const companyQuickbookAccount = await CompanyQuickbookAccount.findByPk(id);
    if (companyQuickbookAccount === null) {
        console.log('CompanyQuickbookAccount Not found!');
        return null;
      } else {
        return companyQuickbookAccount;
      }
  }

  const createCompanyQuickbookAccount = (companyQuickbookAccount) => {
    CompanyQuickbookAccount.create(companyQuickbookAccount, {raw: true}).then(function(companyQBAccount) {
        console.log(companyQBAccount);
       return companyQBAccount;
      })
  }


  module.exports ={
    getCompanyQuickbookAccountById,
    createCompanyQuickbookAccount,
    CompanyQuickbookAccount
  }
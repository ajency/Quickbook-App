'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../DbConnect').sequelize

const CompanyQuickbookAccount = sequelize.define('company_quickbook_account', {
    realm_id: {
     type: Sequelize.BIGINT,
     primaryKey: true,
     allowNull:false
    },
    company_id: {
      type: Sequelize.INTEGER,
      allowNull:false
    },
    access_token: {
      type: Sequelize.TEXT,
      allowNull:false
    },
    refresh_token: {
      type: Sequelize.TEXT,
      allowNull:false
    },
    created_date:{
      type: Sequelize.DATEONLY
    }, 
    updated_date:{
      type: Sequelize.DATEONLY
  }
  },{
    freezeTableName: true
   });

module.exports ={
    CompanyQuickbookAccount
  }

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
    CompanyQuickbookAccount.create({

    }, {raw: true}).then(function(companys) {
        console.log(companys);
        response.status(200).json(companys);
      })
  }


  module.exports ={
    getCompanyQuickbookAccountById,
    CompanyQuickbookAccount
  }
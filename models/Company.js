'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../DbConnect').sequelize

const Company = sequelize.define('company', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
   },
   name: {
     type: Sequelize.STRING,
     allowNull:false
   },
   created_date: {
     type: Sequelize.DATEONLY,
     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
   },
   import_data_source: {
     type: Sequelize.STRING
   },
   accounting_driver:{
       type: Sequelize.ENUM('Quickbook', 'Tally'),
       defaultValue: 'Quickbook'
   }},{
    freezeTableName: true
   });

const getAllCompanies = (request,response) => {
  Company.findAll({}, {raw: true}).then(function(companys) {
    console.log(companys);
    response.status(200).json(companys);
  })
}


module.exports ={
  getAllCompanies,
  Company
}




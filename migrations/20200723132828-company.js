'use strict';

//const Sequelize = require('sequelize');

//const { DataTypes } = require("types/sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('company', {
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
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('company');
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('company_quickbook_account', {
      realm_id: {
       type: Sequelize.BIGINT(30),
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('company_quickbook_account');
  }
};

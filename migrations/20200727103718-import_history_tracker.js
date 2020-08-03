'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('import_history_tracker', {
      id: {
       type: Sequelize.BIGINT,
       primaryKey: true,
       autoIncrement: true
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      session_id: {
        type: Sequelize.STRING,
        allowNull:false
      },
      overall_status: {
        type: Sequelize.ENUM('Published', 'Consumed','Processed','Saved'),
        allowNull:false
      },
      published: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      consumed: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      processed: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      saved: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      data_source_type:{
        type: Sequelize.STRING
      },
      data_source_link:{
        type: Sequelize.STRING,
      },
      created_date:{
        type: Sequelize.DATE
      }, 
      updated_date:{
        type: Sequelize.DATE
    }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('import_history_tracker');
  }
};

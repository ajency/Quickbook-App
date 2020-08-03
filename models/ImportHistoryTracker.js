'use strict';
const Sequelize = require('sequelize');
const db = require('../DbConnect').sequelize

const ImportHistoryTracker = db.define('import_history_tracker', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
       },
       companyId: {
         type: Sequelize.INTEGER,
         allowNull:false,
         field: 'company_id'
       },
       sessionId: {
         type: Sequelize.STRING,
         allowNull:false,
         field: 'session_id'
       },
       overallStatus: {
         type: Sequelize.ENUM('Published', 'Consumed','Processed','Saved'),
         allowNull:false,
         field: 'overall_status'
       },
       published: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        field: 'published'
      },
      consumed: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        field: 'consumed'
      },
      processed: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        field: 'processed'
      },
      saved: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        field: 'saved'
      },
       dataSourceType:{
         type: Sequelize.STRING,
         field: 'data_source_type'
       },
       dataSourceLink:{
         type: Sequelize.STRING,
         field: 'data_source_link'
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


   const createHistory = (importHistory) => {
    ImportHistoryTracker.create(importHistory).then(function(importHistoryTracker) {
        console.log(importHistoryTracker);
       return importHistoryTracker;
      })
   }

   const updateHistory = (importHistory,sessionId) => {
    ImportHistoryTracker.update(importHistory,{
        where: {
            sessionId: sessionId
        }
      }).then(function(importHistoryTracker) {
          return importHistoryTracker;
      })
   }

   module.exports ={
    createHistory,
    updateHistory
   }

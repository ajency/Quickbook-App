const { database, dbUsername, dbPassword, dbHost, dbDialect} = require('./Config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(database, dbUsername, dbPassword, {
    host: dbHost,
    dialect: dbDialect,
    define: {
        timestamps: false
    }
  });

async function ConnectToDb()
{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
 
module.exports = {
    ConnectToDb,
    sequelize
}
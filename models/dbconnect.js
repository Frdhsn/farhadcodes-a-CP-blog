const Sequelize = require('sequelize');
// db configuration
const config = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: '',
  DB: 'farhadcodes',
  dialect: 'mysql',
};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  dialect: config.dialect,
  host: config.HOST,
  port: 3306,
});

module.exports = sequelize;

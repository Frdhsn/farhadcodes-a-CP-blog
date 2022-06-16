const Sequelize = require('sequelize');

// db configuration
const config = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: '',
  DB: 'story',
  dialect: 'mysql',
};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
});

(async () => {
  try {
    //await sequelize.sync({})();
    await sequelize.sync({ force: true })();
    //await sequelize.sync({ alter: true })();
    console.log('The connection has been successfully established......');
  } catch (error) {
    console.error('The database cannot be accessed:', error);
  }
})();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.stories = require('./storymodel')(sequelize);
db.users = require('./usermodel')(sequelize);

module.exports = db;

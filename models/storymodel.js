const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const story = sequelize.define("story", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    authorID: {
      type: Sequelize.INTEGER,
      reference: { model: "users", key: "id" }, // users table, key id // foreign key
    },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    topic: {
      type: Sequelize.STRING,
    },
    difficulty: {
      type: Sequelize.STRING,
    },
  });
  return story;
};

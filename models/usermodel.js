const Sequelize = require('sequelize');
const validator = require('validator');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const user = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    passwordConfirm: {
      type: Sequelize.VIRTUAL,
      //allowNull: false,
      validate: {
        isLongEnough: function (val) {
          if (val.length < 8) {
            throw new Error('Please choose a longer password');
          }
        },
        matches: function (val) {
          if (this.password !== val) {
            throw new Error("Passwords doesn't match");
          }
        },
      },
    },
  });
  return user;
};

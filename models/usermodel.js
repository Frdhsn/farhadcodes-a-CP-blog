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
        // isEqual(el) {  aa
        //   if (el !== this.passwordConfirm) {
        //     throw new Error('Password doesnt match!');
        //   }
        // },
      },
    },
    passwordConfirm: {
      type: Sequelize.STRING,
      //allowNull: false,
      // validate: {
      //   isEqual(el) {
      //     if (el !== this.password) {
      //       throw new Error('Password doesnt match!');
      //     }
      //   },
      // },
    },
  });
  return user;
};

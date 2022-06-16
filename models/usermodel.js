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
      validate: {
        len: [4, 20],
        notEmpty: true,
        // matches(val) {
        //   if (this.passwordConfirm !== val) {
        //     throw new Error("PasswordX doesn't match");
        //   }
        // },
      },
    },
    // passwordConfirm: {
    //   type: Sequelize.VIRTUAL,
    //   //allowNull: false,
    //   validate: {
    //     len: [4, 20],
    //     // isLongEnough: function (val) {
    //     //   if (val.length < 8) {
    //     //     throw new Error('Please choose a longer password');
    //     //   }
    //     // },
    //     matches() {
    //       if (this.password !== this.passwordConfirm) {
    //         throw new Error("PasswordsConfirm doesn't match");
    //       }
    //     },
    //   },
    // },
  });
  return user;
};

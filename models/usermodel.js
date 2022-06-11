const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const user = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true, notEmpty: true }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return user;
};

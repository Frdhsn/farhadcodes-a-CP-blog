const Sequelize = require('sequelize');

// need to change it
module.exports = (sequelize) => {
    const story = sequelize.define('stories', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        authorID: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
            //reference: { model: 'users', key: 'id' } // users table, key id // foreign key
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        topic: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        difficulty: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });
    return story;
};

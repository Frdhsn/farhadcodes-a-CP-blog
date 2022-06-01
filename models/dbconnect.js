//with sequelize
const Sequelize = require("sequelize");

// db configuration
const config = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  //DB: ["story", "users"], // not sure if it'll work
  DB: "story",
  dialect: "mysql",
};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
});

(async () => {
  try {
    //await sequelize.sync({ force: true })();
    await sequelize.sync({alter: true})();
    console.log("The connection has been successfully established......");
  } catch (error) {
    console.error("The database cannot be accessed:", error);
  }
})();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.stories = require("./storymodel.js")(sequelize);
db.users = require("./usermodel.js")(sequelize);
module.exports = db;
// without sequelize
// const express = require('express');
// const mysql = require('mysql');

// // create connection

// const db = mysql.createConnection({
//     host: 'local',
//     user: 'root',
//     password: ''
// });

// // connect to MySQL

// db.connect(err=>{
//     if(err){
//         throw err;
//     }
//     console.log('MySQL Connceted');
// });

// const app = express();

// // Create Database

// app.get('/createdb',(req,res)=>{
//     let sql = 'CREATE DATABASE farhadcodesdb';

//     db.query(sql, err=>{
//         if(err){
//             throw err;
//         }
//         res.send("Database Created");
//     });
// });

//const express = require('express');
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
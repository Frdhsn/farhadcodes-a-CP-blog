const express = require("express");
const app = express();
const mysql = require('mysql');

// DB Start
// create connection

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

// connect to MySQL

db.connect( err => {
    if(err){
        throw err
    }
    console.log('MySQL Connected');
});

// Create Database

app.get('/createdb',(req,res)=>{
    let sql = 'CREATE DATABASE farhadcodesdb';

    db.query(sql, err=>{
        if(err){
            throw err;
        }
        res.send("Database Created");
    });
});
// DB END
const userRoute = require("./routes/User");
app.use("/user",userRoute);

app.listen(3005,() => {
    console.log("Server running on port 3005");
})
const mysql = require('mysql2');

const dotenv = require('dotenv').config();

const connection = mysql.createConnection({
    host:process.env.HOST,
    // mysql default port
    // port: 3306,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database: process.env.DATABASE
});

module.exports = connection;
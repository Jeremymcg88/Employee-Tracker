const mysql = require('mysql2');

//the code that will connection the application to the MySQL database.
const connection = mysql.createConnection(
    {
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: 'password',
    database: 'employees'
},
console.log('Connected to the database')
);

module.exports = connection;
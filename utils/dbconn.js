const mysql = require('mysql');

const mydb = mysql.createConnection({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASS,
port: process.env.DB_PORT,
database: process.env.DB_NAME
});

mydb.connect((err) => {
    if(err){
        throw err;
    } else {
        console.log('Database connected!!');
    }
});

module.exports = mydb;
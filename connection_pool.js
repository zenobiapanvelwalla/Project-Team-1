let mysql = require('mysql');
require('dotenv').config()

function connectionPool() {
    var pool = mysql.createPool({
        connectionLimit: 100, //important
        host: process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASS,
        database:"fms",
        connectionLimit: 5,
        connectTimeout:7000
       
    });
    pool.getConnection(function(err, connection) {
        if (err) {
            connection.release();
            console.log("Cannot connect to database");
            return;
        }
    });
    return pool;

}

module.exports = connectionPool();

let mysql = require('mysql');

function connectionPool() {
    var pool = mysql.createPool({
        connectionLimit: 100, //important
        host: "localhost",
        user: "root",
<<<<<<< HEAD
        password:"root",
        database:"fms"
       
=======
        password: "",
        database: "fms"
>>>>>>> 8727c8d4b8fb2b5c9bda46b9ac656a991031f6f0
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

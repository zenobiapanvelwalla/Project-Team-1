let mysql = require('mysql');

function connectionPool() {
    var pool = mysql.createPool({
        connectionLimit: 100, //important
        host: "fms.cbvajauho28z.us-east-1.rds.amazonaws.com",
        user: "root",
        password:"password",
        database:"fms"
       
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

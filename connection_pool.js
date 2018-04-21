let mysql = require('mysql');

function connectionPool() {
    var pool = mysql.createPool({
        connectionLimit: 100, //important
        host: "localhost",
        user: "root",
<<<<<<< HEAD
        password: "root",
=======
        password: "",
>>>>>>> f374f92043eb8ecb290850504abbae99f265fa65
        database: "fms"
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

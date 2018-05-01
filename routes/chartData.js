var express = require('express');
var router = express.Router();
var con = require('../connection_pool');


router.get('/', function(req, res, next) {
    var user_id = localStorage.getItem('user_id');
    console.log('user_id');
    var sql = `select state,count(state)as count from leads where user_id=${user_id} group by state;`;
    var query = con.query(sql,(error, results) => {
        if(error) throw error;
        console.log(results);
        if(results != undefined)
        {
            res.send(results);
        }
            else{
                res.send('Invalid');
            }
    });
    
});



module.exports = router;

var express = require('express');
var router = express.Router();
var con = require('../connection_pool');

/* GET home page. */
router.get('/', function(req, res, next) {

     res.render("dashboard");
});

app.get('/chartData',function(req, res, next){

})

module.exports = router;

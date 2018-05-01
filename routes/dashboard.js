var express = require('express');
var router = express.Router();
var con = require('../connection_pool');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("dashboard",{title:"Dashboard"});
});






module.exports = router;

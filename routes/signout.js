var express = require('express');
var router = express.Router();
var localStorage = require('node-localstorage');

/* GET home page. */
router.get('/', function(req, res, next) {

    req.session.destroy();
    localStorage.clear();

    res.render("index");
});






module.exports = router;

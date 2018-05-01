var express = require('express');
var router = express.Router();
var localStorage = require('node-localstorage');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

/* GET home page. */
router.get('/', function(req, res, next) {

    req.session.destroy();
    //localStorage.clear();

    res.render("index",{error:null});
});






module.exports = router;

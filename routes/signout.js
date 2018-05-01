var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    req.session.destroy();
    localStorage.clear();

    res.render('index', { title: 'Express',error:null });
});






module.exports = router;

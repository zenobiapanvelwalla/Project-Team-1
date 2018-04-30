var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('login', { title: '' });
});

router.post('/', function(req, res, next) {
  let user_id = 1;
  console.log(req.body);
  res.write(req.body);
});

module.exports = router;

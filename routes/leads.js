var express = require('express');
var router = express.Router();
var con = require('../connection_pool');

/* GET home page. */
router.post('/', function(req, res, next) {
  let user_id = 1;
  console.log(req.body);
  con.query('INSERT INTO leads(first_name,last_name,address,city,state,zip_code,email,phone_number,best_time_to_call,current_occupation,net_worth,assets,partners,interested,background,user_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
  [
      req.body.first_name,
      req.body.last_name,
      req.body.address,
      req.body.city,
      req.body.state,
      req.body.zip_code,
      req.body.email,
      req.body.phone_number,
      req.body.best_time_to_call,
      req.body.current_occupation,
      req.body.net_worth,
      req.body.assets,
      req.body.partners,
      req.body.interested,
      req.body.background.toString(),
      user_id
  ],function(err,lead,fields){
    if(err) throw err;
    res.send(lead);
  });
});

module.exports = router;


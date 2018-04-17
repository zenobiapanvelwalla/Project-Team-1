var express = require('express');
var router = express.Router();
var con = require('../connection_pool');
var bcrypt = require('bcryptjs');
const saltRounds = 10;
 
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/',function(req,res,next){
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;
  let phone_number = req.body.phone_number;
  let city = req.body.city;
  let state = req.body.state;
  let country = req.body.country;
  let zipcode = req.body.zipcode;
  let address = req.body.address;
  let password = req.body.password;

  bcrypt.hash(password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    con.query('INSERT INTO users (first_name,last_name,email,phone_number,city,state,country,zipcode,address,password) VALUES(?,?,?,?,?,?,?,?,?,?)',[first_name,last_name,email,phone_number,city,state,country,zipcode,address,hash],function(err, result,fields) {
      if(err) throw err;
      res.render('index',{title:'Registration Complete!'});
    });
  });

  
});
module.exports = router;

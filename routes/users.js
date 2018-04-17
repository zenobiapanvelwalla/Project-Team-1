var express = require('express');
var router = express.Router();
var con = require('../connection_pool');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy =  require('passport-local').Strategy;
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

passport.use('local', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'pwd',
  passReqToCallback : true
},
function(req, email, pwd, done) {
  console.log("I am in passport.use");
  con.query('SELECT * FROM users WHERE email='+email+';',function(err,user){
    if(err) throw err;
    console.log(user);
    bcrypt.compare(pwd, user['password'], function(err, isMatch){
      if(err) throw err;
      if(isMatch) { 
        done(null,user);
      }
      else {
        done(null,false);
      }
      
    });

  });
  


}));
 
passport.serializeUser(function(user, done){
  console.log(user);
  done(null, user.id);
});
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});
router.post('/login',function(req,res,next){
  let response = {};
  passport.authenticate('local',function(err, user){
    if(err) throw err;
    if(user){
      req.login(user,function(err){
        if(err){
          console.log(err);
        }
      });
      response.success = true;
      response.statusCode = 200;
      response.message = user;
      res.send(response);
    } else {
      response.success = false;
      response.statusCode = 401;
      response.message = "Incorrect login credentials";
      res.send(response);
    }
  })(req,res,next);
   

});
module.exports = router;



var express = require('express');
var router = express.Router();
var con = require('../connection_pool');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy =  require('passport-local').Strategy;
const saltRounds = 10;
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
 
/* GET users listing. */
router.get('/', function(req, res, next) {
  con.query("SELECT * FROM users",function(err,users){
    if(err) throw err;
    console.log(users);
    res.send(users);

  });
 
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
  let company_name = req.body.company_name;

  //bcrypt.hash(password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    con.query('INSERT INTO users (first_name,last_name,email,phone_number,city,state,country,zipcode,address,password,company_name) VALUES(?,?,?,?,?,?,?,?,?,?,?)',[first_name,last_name,email,phone_number,city,state,country,zipcode,address,password,company_name],function(err, result,fields) {
      if(err) throw err;
      res.render('registrationSuccess',{first_name: first_name});
    });
  //});

  
});

passport.use('local', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
},
function(req, email, password, done) {
  console.log("I am in passport.use"+password);
  con.query('SELECT * FROM users WHERE email=?',[email],function(err,user){
    if(err) throw err;
    console.log(user[0]['password']);
    bcrypt.compare(password, user[0]['password'], function(err, isMatch){
      if(err) throw err;
      if(isMatch) { 
        console.log("matched");
        done(null,user[0]);
      }
      else {
        console.log("no");
        done(null,false);
      }
      
    });

  });
  


}));
 
passport.serializeUser(function(user, done){
  console.log(user);
  done(null, user['id']);
});
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});
router.post('/login',function(req,res,next){
  let response = {};
  // passport.authenticate('local',function(err, user){
  //   if(err) throw err;
  //   if(user){
  //     req.login(user,function(err){
  //       if(err){
  //         console.log(err);
  //       }
  //       //adding user id and user type to session
  //       console.log(user);
  //       req.session.user_id = user.id;
  //       req.session.user_type = user.user_type;
  //     });
  //     response.success = true;
  //     response.statusCode = 200;
  //     response.message = user;
  //     res.send(response);
  //   } else {
  //     response.success = false;
  //     response.statusCode = 401;
  //     response.message = "Incorrect login credentials";
  //     res.send(response);
  //   }
  // })(req,res,next);
  if(req.body.user_type=="franchisor"){
   con.query("SELECT * FROM users WHERE email=? AND password=?",[req.body.email,req.body.password],function(err,user){
     if(err) throw err;
     if(user.length>0){
      var user_id = user[0]['id'];
     
      req.session.user_id = user_id;
      localStorage.setItem('user_id',user_id);
      localStorage.setItem('company_name',user[0]['company_name']);
      console.log(req.session.user_id);
      res.redirect("/leads");
      // con.query('SELECT * FROM leads WHERE user_id=?',[user_id],function(err,leads){
      //   if(err) throw err;
      //   redirect('/leads');
      //   res.render('leadsList',{title:"Home",leads:leads,company_name:user[0]['company_name'],error:null});
      // });
      
     }
     else {
       
       res.render('index',{error:"User Not found"});
     }
   });
  } else {
    
    con.query('SELECT * FROM leads WHERE email=? AND frankey=?',[req.body.email,req.body.password],function(err,lead){
      if(err) throw err;
      if(lead.length>0){
        localStorage.setItem('lead_id',lead[0]['id']);
        res.redirect('/leads/tasks/'+lead[0]['id']);
      } else{
        res.render('index',{error:"User Not found"});
      }
    });
  }

});


module.exports = router;

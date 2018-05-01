var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParese = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var leads = require('./routes/leads');
var tasksRouter = require('./routes/tasks');
var signUpFranchsior = require('./routes/signUpFranchsior');
var login = require('./routes/login');
var signUpFranchisee = require('./routes/signUpFranchisee');
var dashboard = require('./routes/dashboard');
var signout = require('./routes/signout');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: true } //this is for https
}));
app.use(flash());
app.use(function(req,res,next){
  res.locals.error_msg = req.flash('error_msg');
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/leads', leads);
app.use('/tasks', tasksRouter);
app.use('/signUpFranchsior',signUpFranchsior);
app.use('/login',login);
app.use('/signUpFranchisee',signUpFranchisee);
app.use('/dashboard',dashboard);
app.use('/signout',signout);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.get('/chartData', function (req, res) {

  var sql = `SELECT * FR WHERE UserId = ${UserId}`;
  var query = connection.query(sql,(error, results) => {
      if(error) throw error;
      console.log(results);
      if(results != undefined)
      {res.send({data:'Fund Added'});
          req.session.UserId = req.body.UserId;
          
      }
          else{
              res.send('Invalid');
          }
  });
  res.send(req.params)
})
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

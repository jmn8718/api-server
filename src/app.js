var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var config = require('./config');


var app = express();

/*
 Dependencies for authentication
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/*
 Connection to Mongo DB
 */

var mongoose = require('mongoose');
mongoose.connect(config.mongoUrl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected correctly to server");
});

/*
 view engine setup
  */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'public')));

/*
passport config
 */
var User = require('./models/user');
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*
 Routes
 */
var routes = require('./routes/index');
var api = require('./api/api');

app.use('/', routes);
app.use('/api', api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/*
 error handlers
 */


if (app.get('env') === 'development') {
  // development error handler
  // will print stacktrace
  app.use(function(err, req, res, next) {
    if (req.path.indexOf('/api') === 0){
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: err
      });
    } else {
      res.render('error',{
        message: err.message,
        error: err
      });
    }
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    if (req.path.indexOf('/api') === 0){
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: err
      });
    } else {
      res.render('error',{
        message: err.message,
        error: {}
      });
    }
  });
}

module.exports = app;

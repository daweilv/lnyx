var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
//var RedisStore = require('connect-redis')(session);

var config = require('./src/common/config');
var blog = require('./src/blog/route');
var admin = require('./src/admin/route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: config.session.secret,
  resave: config.session.resave,
  saveUninitialized: config.session.saveUninitialized,
  //store: new RedisStore(config.redis)
}));
app.use(express.static(path.join(__dirname, 'www')));

app.use('/', blog);
app.use('/', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('common/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('common/error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

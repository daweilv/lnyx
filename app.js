var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
//var RedisStore = require('connect-redis')(session);

var config = require('./src/common/config');
var BlogRouter = require('./src/blog/route/BlogRouter');
var AdminRouter = require('./src/admin/route/AdminRouter');
var VisitLogic = require('./src/common/logic/VisitLogic');
var BlogLogic = require('./src/blog/logic/BlogLogic');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: config.session.secret,
    resave: config.session.resave,
    saveUninitialized: config.session.saveUninitialized,
    //store: new RedisStore(config.redis)
}));
app.use(express.static(path.join(__dirname, 'www')));

app.use(VisitLogic);
app.use('/', BlogRouter);
app.use('/', AdminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('common/error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    if (req.query.__debug == config.password.debug) {
        res.render('common/error', {
            message: err.message,
            error: err
        });
    } else {
        req.params.seo_url = '404';
        BlogLogic.goArticle(req, res, next)
    }
});


module.exports = app;

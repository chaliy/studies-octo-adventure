var express = require('express');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');

var config = require('./config/config');
var bootEngine = require('./config/boot/engine');
var bootControllers = require('./config/boot/controllers');

// Catch all errors...
process.on('unhandledRejection', function(reason, p){
    console.log("Possibly unhandled rejection at: Promise ", p, " reason: ", reason);
});

var app = express();

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

bootEngine(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(compress());
app.use(express.static(__dirname + '/public'));

bootControllers(app);

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if(app.get('env') === 'development'){
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      title: 'error'
    });
  });
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
});

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

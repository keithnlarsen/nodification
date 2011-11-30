var express = require('express');
var routes = require('./routes');
var mongoose = require('mongoose');

var app = module.exports = express.createServer();

// Configuration
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
//  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
//  app.use(express.errorHandler());
});

mongoose.connect('mongodb://localhost/nodification-dev');

// Register ErrorHandler
var restErrors = require('./libs/resterrors');
app.error(restErrors.ErrorHandler);
app.RestError = restErrors.RestError;

// Register Models
app.models = require('./models');
app.models.init(mongoose);

// Register Controllers
app.controllers = require('./controllers');
app.controllers.init(app.models);

// Register Routes
routes.init(app);
app.get('/', routes.index);
app.get('/notificationTypes', routes.notificationType.index);
// TODO: fill in the rest of the crud for NotificationTypes

// Handle all other routes with a NotFound error
app.use(function(req, res, next) {
  next(app.RestError.NotFound.create(req.url));
});

// example of how to throw a 500
app.get('/500', function(req, res, next) {
  next(new Error('keyboard cat!'));
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

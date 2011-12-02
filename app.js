var express = require('express');
var mongoose = require('mongoose');

var app = module.exports = express.createServer();

// Configuration
app.configure(function() {
  app.set('views', __dirname + '/views');
//  app.set('view engine', 'jade');
  app.register('html', require('ejs'));
  app.set('view engine', 'html');
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
app.error(restErrors.errorHandler);
app.restErrors = restErrors.restErrors;

// Register Models
app.models = require('./models');
app.models.init(mongoose);

// Register Controllers
app.controllers = require('./controllers');
app.controllers.init(app.models);

// Register Routes
var routes = require('./routes');
routes.init(app);

app.get('/', routes.index);

//app.get('/notificationTypes.:format?', routes.notificationType.index);
app.get('/notificationTypes.:format?', function (req, res, next){
  routes.notificationType.index(req, res, next);
});

app.get('/notificationTypes/new', function (req, res, next) {
  routes.notificationType.new(req, res, next);
});

app.get('/notificationTypes/:id.:format?', function (req, res, next) {
  routes.notificationType.show(req, res, next);
});
app.get('/notificationTypes/:id/edit', function (req, res, next) {
  routes.notificationType.edit(req, res, next);
});

app.post('/notificationTypes/:id.:format?', function (req, res, next) {
  routes.notificationType.update(req, res, next);
});

app.put('/notificationTypes.:format?', function (req, res, next){
  routes.notificationType.add(req, res, next);
});

// Handle all other non-registered routes with a notFound error
app.use(function (req, res, next) {
  next(app.restErrors.notFound.create(req.url));
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

module.exports = ( function () {
  var express = require( 'express' );
  var mongoose = require( 'mongoose' );
//  var log4js = require( 'log4js' );

//  log4js.addAppender(log4js.consoleAppender());
//  log4js.addAppender(log4js.fileAppender('logs/nodification.log'), 'nodification');

  var app = express.createServer();

//  app.logger = log4js.getLogger( 'nodification' );
//  app.logger.setLevel('DEBUG');
  app.mongoose = mongoose;

  app.configure( 'development', function () {
    app.use( express.logger( { format: '\x1b[1m :date \x1b[1m:method\x1b[0m \x1b[33m:url\x1b[0m :response-time ms\x1b[0m :status' } ) );
  } );

  app.configure( 'test', function () {
  } );

  app.configure( 'production', function () {
    app.use( express.logger( { format: '\x1b[1m :date \x1b[1m:method\x1b[0m \x1b[33m:url\x1b[0m :response-time ms\x1b[0m :status' } ) );
  } );

  // Configuration
  app.configure( function () {
    app.set( 'root', __dirname );
    app.set( 'views', __dirname + '/views' );
    app.register( 'html', require( 'ejs' ) );
    app.set( 'view engine', 'html' );
    app.use( express.bodyParser() );
//    app.use( express.methodOverride() );
    app.use( app.router );
    app.use( express.static( __dirname + '/public' ) );
  } );

  mongoose.connect( 'mongodb://localhost/nodification-dev' );

  // Register ErrorHandler
  var restErrors = require( './libs/resterrors' );
  app.error( restErrors.errorHandler );
  app.restErrors = restErrors.errors;
  app.logger = restErrors.initLogger( app );

  // Register Models
  app.models = require( './models' );
  app.models.init( app );

  // Register Controllers
  app.controllers = require( './controllers' );
  app.controllers.init( app.models, app.restErrors );

  // Register Middleware
  app.middleWare = require( './middleware' );
  app.middleWare.init( app );

  app.gateways = {};
  app.gateways.notificationRegistration = {};

  app.configure( 'development', function () {
//    console.log('Stub Attached!');
    app.logger.warn('Stub Attached!');
    var stub = require('stub.js');
    app.gateways.notificationRegistration.Voicemail = { register: stub.async( null, true ) };
  } );


  // Load the routes
  var routes = require( './routes' );
  routes.init( app );

  // Handle all other non-registered routes with a notFound error
  app.use( function ( req, res, next ) {
    next( app.restErrors.notFound.create( req.url ) );
  } );

  if ( !module.parent ) {
    app.listen( 3000 );
//    console.log( "Express server listening on port %d in %s mode", app.address().port, app.settings.env );
    app.logger.info( "Express server listening on port %d in %s mode", app.address().port, app.settings.env );
  }

  return app;
}());
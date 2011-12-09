module.exports = ( function() {
  var express = require( 'express' );
  var mongoose = require( 'mongoose' );

  var app = express.createServer();

  // Configuration
  app.configure( function() {
    app.set( 'views', __dirname + '/views' );
    app.set('view engine', 'jade');
//    app.register( 'html', require( 'ejs' ) );
//    app.set( 'view engine', 'html' );
    app.use( express.bodyParser() );
    app.use( express.methodOverride() );
    app.use( express.cookieParser() );
//    app.use(express.session({ secret: 'your secret here' }));
    app.use( app.router );
    app.use( express.static( __dirname + '/public' ) );
    app.use( express.logger( { format: '\x1b[1m :date \x1b[1m:method\x1b[0m \x1b[33m:url\x1b[0m :response-time ms\x1b[0m :status' } ) );
  } );

  app.configure( 'development', function() {
    app.use( express.logger( { format: '\x1b[1m :date \x1b[1m:method\x1b[0m \x1b[33m:url\x1b[0m :response-time ms\x1b[0m :status' } ) );
    //app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  } );

  app.configure( 'test', function() {

  });

  app.configure( 'production', function() {
    //app.use(express.errorHandler());
  } );

  mongoose.connect( 'mongodb://localhost/nodification-dev' );

  // Register ErrorHandler
  var restErrors = require( './libs/resterrors' );
  app.error( restErrors.errorHandler );
  app.restErrors = restErrors.errors;

  // Register Models
  app.models = require( './models' );
  app.models.init( mongoose );

  // Register Controllers
  app.controllers = require( './controllers' );
  app.controllers.init( app.models, app.restErrors );

  app.get( '/', function( req, res ) {
    res.render( 'index.jade', { title: 'Express' } );
  } );

  app.get( '/notificationTypes', function ( req, res, next ) {
    app.controllers.notificationType.list( req, res, next );
  } );

  app.put( '/notificationTypes', function ( req, res, next ) {
    app.controllers.notificationType.insert( req, res, next );
  } );

  app.get( '/notificationTypes/:id', function ( req, res, next ) {
    app.controllers.notificationType.get( req, res, next );
  } );

  app.post( '/notificationTypes/:id', function ( req, res, next ) {
    app.controllers.notificationType.update( req, res, next );
  } );

  app.del( '/notificationTypes/:id', function ( req, res, next ) {
    app.controllers.notificationType.remove( req, res, next );
  } );

  // TODO: the following routes
  // [get, put]          /registrations
  // [get, post, delete] /registrations/:id
  // [get, put]          /registrations/:id/devices
  // [get, post, delete] /registrations/:id/devices/:id
  // [get, put]          /events
  // [get, post, delete] /events/:id
  // [get]               /events/notificationType=:typeid

  // Handle all other non-registered routes with a notFound error
  app.use( function ( req, res, next ) {
    next( app.restErrors.notFound.create( req.url ) );
  } );

  if ( !module.parent ) {
    app.listen( 3000 );
    console.log( "Express server listening on port %d in %s mode", app.address().port, app.settings.env );
  }

  return app;
}());
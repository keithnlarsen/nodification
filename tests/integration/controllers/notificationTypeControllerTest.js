describe( 'nodification.tests.integration.controllers.notificationType', function() {

  var http = require( 'http' );
  var should = require( 'should' );
  var createJSON = JSON.parse( "{\"name\":\"Test\",\"registrationUrl\":\"url\",\"userName\": \"username\",\"password\": \"password\"}" );
  var updateJSON = JSON.parse( "{\"name\":\"Test2\",\"registrationUrl\":\"url2\",\"userName\": \"username2\",\"password\": \"password2\"}" );
  var newId = '';
  var notificationType;
  var app;

  var localhost = http.createClient( 3000, 'localhost' );
  var requestHandler = require('../../../libs/requestHandler');

  before( function( done ) {
    var app = require( '../../../app' );

    app.listen( 3000 );
    console.log( 'Running testing server at http://127.0.0.1:3000/' + '\r\r' );

    // Delay to make sure that node server has time to start up on slower computers before running the tests.
    setTimeout( function() {
      // Setup our connection to the database and load our model and controller
      var mongoose = require( 'mongoose' );
      mongoose.connect( 'mongodb://localhost/nodification-dev' );
      notificationType = require( '../../../models/notificationType.js' ).create( mongoose );
      // Just in case something bad happened, let's clear out the database
      notificationType.model.remove( {}, function( err ) {
        done( err )
      } );

    }, 250 );
  } );

  after( function( done ) {
    // Clear out our database once we are done
    notificationType.model.remove( {}, function( err ) {
      done( err )
    } );
  } );

  describe( 'PUT to /notificationType', function() {
    it( 'should create a new NotificationType', function( done ) {
      var request = localhost.request( 'PUT', '/notificationTypes', {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
      request.write( JSON.stringify( createJSON ) );

      requestHandler.handle( request, function( err, response ) {
        var actual = JSON.parse( response.body );
        var expected = createJSON;

        newId = actual._id.toString();
        actual.name.should.equal( expected.name );
        actual.registrationUrl.should.equal( expected.registrationUrl );
        actual.userName.should.equal( expected.userName );
        actual.password.should.equal( expected.password );
        response.statusCode.should.equal( 201 );

        done();
      } );
    } );
    it( 'should return 409 Conflict when trying to insert a duplicate name record', function( done ) {
      var request = localhost.request( 'PUT', '/notificationTypes', {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
      request.write( JSON.stringify( createJSON ) );

      requestHandler.handle( request, function( err, response ) {
        response.statusCode.should.equal( 409 );
        response.body.should.match( /duplicate key error/ );

        done();
      } );
    } )
  } );

  describe( 'GET to /notificationType/:id', function() {
    it( 'should return a single NotificationType when given an existing Id', function( done ) {
      var request = localhost.request( 'GET', '/notificationTypes/' + newId, {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );

      requestHandler.handle( request, function( err, response ) {
        var actual = JSON.parse( response.body );
        var expected = createJSON;

        response.statusCode.should.equal( 200 );
        actual.name.should.equal( expected.name );
        actual.registrationUrl.should.equal( expected.registrationUrl );
        actual.userName.should.equal( expected.userName );
        actual.password.should.equal( expected.password );

        done();
      } );
    } );
    it( 'should return 404 NotFound when given a non-existing Id', function( done ) {
      var request = localhost.request( 'GET', '/notificationTypes/111111111111111111111111', {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );

      requestHandler.handle( request, function( err, response ) {
        response.statusCode.should.equal( 404 );

        done();
      } );
    } );
  } );

  describe( 'POST to /notificationType/:id', function() {
    it( 'should update an existing NotificationType', function( done ) {
      var request = localhost.request( 'POST', '/notificationTypes/' + newId, {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
      request.write( JSON.stringify( updateJSON ) );

      requestHandler.handle( request, function( err, response ) {
        var actual = JSON.parse( response.body );
        var expected = updateJSON;

        newId = actual._id.toString();
        actual.name.should.equal( expected.name );
        actual.registrationUrl.should.equal( expected.registrationUrl );
        actual.userName.should.equal( expected.userName );
        actual.password.should.equal( expected.password );
        response.statusCode.should.equal( 200 );

        done();
      } );
    } );
    it( 'should return 404 NotFound when trying to Update a NotificationType That Doesn\'t Exist', function( done ) {
      var request = localhost.request( 'POST', '/notificationTypes/111111111111111111111111', {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
      request.write( JSON.stringify( updateJSON ) );

      requestHandler.handle( request, function( err, response ) {
        response.statusCode.should.equal( 404 );

        done();
      } );
    } );
  } );

  describe( 'GET to /notificationType', function() {
    it( 'should return all NotificationTypes', function( done ) {
      var request = localhost.request( 'GET', '/notificationTypes', {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );

      requestHandler.handle( request, function( err, response ) {
        var actual = JSON.parse( response.body );
        var expected = updateJSON;

        response.statusCode.should.equal( 200 );
        actual[0].name.should.equal( expected.name );
        actual[0].registrationUrl.should.equal( expected.registrationUrl );
        actual[0].userName.should.equal( expected.userName );
        actual[0].password.should.equal( expected.password );

        done();
      } );
    } );
  } );

  describe( 'DELETE to /notificationType/:id', function() {
    it( 'should delete person when called with an existing Id', function( done ) {
      var request = localhost.request( 'DELETE', '/notificationTypes/' + newId, {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
      request.write('{}');

      requestHandler.handle( request, function( err, response ) {
        response.statusCode.should.equal( 200 );

        done();
      } );
    } );
    it( 'should return 404 when called with an Id that doesn\'t exist', function( done ) {
      var request = localhost.request( 'DELETE', '/notificationTypes/' + newId, {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
      request.write('{}');
      requestHandler.handle( request, function( err, response ) {
        response.statusCode.should.equal( 404 );

        done();
      } );
    } );
  } );
} );
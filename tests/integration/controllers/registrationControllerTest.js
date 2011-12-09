describe( 'Nodification.Tests.Integration.Controllers.RegistrationController', function() {

  var http = require( 'http' );
  var should = require( 'should' );
  var voiceMailJSON = JSON.parse( "{\"name\":\"VoiceMail\",\"registrationUrl\":\"url\",\"userName\": \"username\",\"password\": \"password\"}" );
  var voiceMailId;
  var createJSON = JSON.parse( "{\"notificationType\":\" \",\"key\":\"4039819330\",\"registrationConfirmed\":false,\"devices\":[{ \"type\":\"ios\",\"name\":\"test\",\"token\":\"123ef0b00000000\"}] }" );
  var updateJSON = JSON.parse( "{\"notificationType\":\" \",\"key\":\"4039819330\",\"registrationConfirmed\":true,\"devices\":[{ \"type\":\"ios\",\"name\":\"test2\",\"token\":\"123ef0b00000000\"}] }" );
  var newId = '';
  var notificationType;
  var registration;
  var app;

  var localhost = http.createClient( 3000, 'localhost' );
  var requestHelper = function( request, fn ) {
    request.end();

    request.on( 'response', function ( response ) {
      var responseBody = "";
      response.setEncoding( 'utf8' );

      response.addListener( "data", function( chunk ) {
        responseBody += chunk;
      } );

      response.on( 'end', function() {
        response.body = responseBody;
        fn( response );
      } );
    } );
  };

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
      registration = require( '../../../models/registration.js' ).create( mongoose );

      // Just in case something bad happened, let's clear out the database
      registration.model.remove( {}, function( err ) {
        notificationType.model.remove( {}, function( err ) {
          // populate the database with a new notificationType
          notificationType.model.create(voiceMailJSON, function(err, voiceMail) {
            // setup our test records to use that notificationType
            voiceMailId = voiceMail._id.toString();
            createJSON.notificationType = voiceMailId;
            updateJSON.notificationType = voiceMailId;
            done( err )
          });
        } );
      } );
    }, 250 );
  } );

  after( function( done ) {
    // Clear out our database once we are done
    registration.model.remove( {}, function( err ) {
      notificationType.model.remove( {}, function( err ) {
        done( err )
      } );
    } );
  } );

  describe( 'PUT to /registrations', function() {
    it( 'should create a new Registration', function( done ) {
      var request = localhost.request( 'PUT', '/registrations', {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
      request.write(JSON.stringify(createJSON));

      requestHelper( request, function( response ) {
        var actual = JSON.parse( response.body );
        var expected = createJSON;

        newId = actual._id.toString();
        actual.notificationType.toString().should.equal( voiceMailId );
        actual.key.should.equal( expected.key );
        actual.registrationConfirmed.should.equal( expected.registrationConfirmed );
        actual.devices[0].name.should.equal( expected.devices[0].name );
        actual.devices[0].type.should.equal( expected.devices[0].type );
        actual.devices[0].token.should.equal( expected.devices[0].token );
        response.statusCode.should.equal( 201 );

        done();
      } );
    } );
  } );

  describe( 'GET to /registrations/:id', function() {
    it( 'should return a single Registration when given an existing Id', function( done ) {
      var request = localhost.request( 'GET', '/registrations/' + newId, {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );

      requestHelper( request, function( response ) {
        var actual = JSON.parse( response.body );
        var expected = createJSON;

        actual.notificationType._id.should.equal( voiceMailId );
        actual.notificationType.name.should.equal( voiceMailJSON.name );
        actual.key.should.equal( expected.key );
        actual.registrationConfirmed.should.equal( expected.registrationConfirmed );
        actual.devices[0].name.should.equal( expected.devices[0].name );
        actual.devices[0].type.should.equal( expected.devices[0].type );
        actual.devices[0].token.should.equal( expected.devices[0].token );
        response.statusCode.should.equal( 200 );

        done();
      } );
    } );
    it( 'should return 404 NotFound when given a non-existing Id', function( done ) {
      var request = localhost.request( 'GET', '/registrations/111111111111111111111111', {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );

      requestHelper( request, function( response ) {
        response.statusCode.should.equal( 404 );

        done();
      } );
    } );
  } );

//  describe( 'POST to /notificationType/:id', function() {
//    it( 'should update an existing NotificationType', function( done ) {
//      var request = localhost.request( 'POST', '/registrations/' + newId, {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
//      request.write( JSON.stringify( updateJSON ) );
//
//      requestHelper( request, function( response ) {
//        var actual = JSON.parse( response.body );
//        var expected = updateJSON;
//
//        newId = actual._id.toString();
//        actual.name.should.equal( expected.name );
//        actual.registrationUrl.should.equal( expected.registrationUrl );
//        actual.userName.should.equal( expected.userName );
//        actual.password.should.equal( expected.password );
//        response.statusCode.should.equal( 200 );
//
//        done();
//      } );
//    } );
//    it( 'should return 404 NotFound when trying to Update a NotificationType That Doesn\'t Exist', function( done ) {
//      var request = localhost.request( 'POST', '/registrations/111111111111111111111111', {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
//      request.write( JSON.stringify( updateJSON ) );
//
//      requestHelper( request, function( response ) {
//        response.statusCode.should.equal( 404 );
//
//        done();
//      } );
//    } );
//  } );
//
//  describe( 'GET to /notificationType', function() {
//    it( 'should return all NotificationTypes', function( done ) {
//      var request = localhost.request( 'GET', '/registrations', {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
//
//      requestHelper( request, function( response ) {
//        var actual = JSON.parse( response.body );
//        var expected = updateJSON;
//
//        response.statusCode.should.equal( 200 );
//        actual[0].name.should.equal( expected.name );
//        actual[0].registrationUrl.should.equal( expected.registrationUrl );
//        actual[0].userName.should.equal( expected.userName );
//        actual[0].password.should.equal( expected.password );
//
//        done();
//      } );
//    } );
//  } );
//
//  describe( 'DELETE to /notificationType/:id', function() {
//    it( 'should delete person when called with an existing Id', function( done ) {
//      var request = localhost.request( 'DELETE', '/registrations/' + newId, {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
//      request.write('{}');
//
//      requestHelper( request, function( response ) {
//        console.log( response.body );
//        response.statusCode.should.equal( 200 );
//
//        done();
//      } );
//    } );
//    it( 'should return 404 when called with an Id that doesn\'t exist', function( done ) {
//      var request = localhost.request( 'DELETE', '/registrations/' + newId, {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
//      request.write('{}');
//      requestHelper( request, function( response ) {
//        response.statusCode.should.equal( 404 );
//
//        done();
//      } );
//    } );
//  } );
} );
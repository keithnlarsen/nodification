describe( 'Nodification.Tests.Integration.Controllers.RegistrationDeviceController', function() {

  var http = require( 'http' );
  var should = require( 'should' );
  var voiceMailJSON = JSON.parse( "{\"name\":\"VoiceMail\",\"registrationUrl\":\"url\",\"userName\": \"username\",\"password\": \"password\"}" );
  var voiceMailId;
  var registrationJSON = JSON.parse( "{\"notificationType\":\" \",\"key\":\"4039819330\",\"registrationConfirmed\":false, \"devices\": []}" );
  var registrationId;
  var createJSON = JSON.parse( "{ \"type\":\"ios\",\"name\":\"testios\",\"token\":\"ios123ef0b00000000\"}" );
  var createJSON2 = JSON.parse( "{ \"type\":\"android\",\"name\":\"test\",\"token\":\"ios123ef0b00000000\"}" );
  var updateJSON = JSON.parse( "{ \"type\":\"ios\",\"name\":\"testios2\",\"token\":\"ios3498232389\"}" );
  var newId = '';
  var notificationType;
  var registration;
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
      registration = require( '../../../models/registration.js' ).create( mongoose );

      // Just in case something bad happened, let's clear out the database
      registration.model.remove( {}, function( err ) {
        notificationType.model.remove( {}, function( err ) {
          // populate the database with a new notificationType
          notificationType.model.create( voiceMailJSON, function( err, voiceMail ) {
            // setup our test records to use that notificationType
            voiceMailId = voiceMail._id.toString();
            registrationJSON.notificationType = voiceMailId;
            registration.model.create( registrationJSON, function( err, registration ) {
              registrationId = registration._id.toString();
              done( err )
            } );
          } );
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

  describe( 'PUT to /registrations/:id/devices', function() {
    it( 'should create a new Device', function( done ) {
      var request = localhost.request( 'PUT', '/registrations/' + registrationId + '/devices', {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
      request.write( JSON.stringify( createJSON ) );

      requestHandler.handle( request, function( err, response ) {
        var actual = JSON.parse( response.body );
        var expected = createJSON;

        newId = actual._id.toString();
        actual.name.should.equal( expected.name );
        actual.type.should.equal( expected.type );
        actual.token.should.equal( expected.token );
        response.statusCode.should.equal( 201 );

        done();
      } );
    } );
    it( 'should create a second new Device', function( done ) {
      var request = localhost.request( 'PUT', '/registrations/' + registrationId + '/devices', {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
      request.write( JSON.stringify( createJSON2 ) );

      requestHandler.handle( request, function( err, response ) {
        var actual = JSON.parse( response.body );
        var expected = createJSON2;

        actual.name.should.equal( expected.name );
        actual.type.should.equal( expected.type );
        actual.token.should.equal( expected.token );
        response.statusCode.should.equal( 201 );

        done();
      } );
    } );
  } );

  describe( 'GET to /registrations/:id/devices/:eid', function() {
    it( 'should get a Device given an existing registration id and device id', function( done ) {
      var request = localhost.request( 'GET', '/registrations/' + registrationId + '/devices/' + newId, {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );

      requestHandler.handle( request, function( err, response ) {
        var actual = JSON.parse( response.body );
        var expected = createJSON;

        actual.name.should.equal( expected.name );
        actual.type.should.equal( expected.type );
        actual.token.should.equal( expected.token );
        response.statusCode.should.equal( 200 );

        done();
      } );
    } );
  } );

  describe( 'POST to /registrations/:id/devices/:eid', function() {
    it( 'should update an existing Device', function( done ) {
      var request = localhost.request( 'POST', '/registrations/' + registrationId + '/devices/' + newId, {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
      request.write( JSON.stringify( updateJSON ) );

      requestHandler.handle( request, function( err, response ) {
        var actual = JSON.parse( response.body );
        var expected = updateJSON;

        actual.name.should.equal( expected.name );
        actual.type.should.equal( expected.type );
        actual.token.should.equal( expected.token );
        response.statusCode.should.equal( 200 );

        done();
      } );
    } );
  } );

  describe( 'GET to /registrations/:id/devices', function() {
    it( 'should get the full list of Devices for a given registration id', function( done ) {
      var request = localhost.request( 'GET', '/registrations/' + registrationId + '/devices', {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );

      requestHandler.handle( request, function( err, response ) {
        var actual = JSON.parse( response.body );
        var expected = {};
        expected[0] = updateJSON;
        expected[1] = createJSON2;

        actual.should.be.length(2);
        actual[0].name.should.equal( expected[0].name );
        actual[0].type.should.equal( expected[0].type );
        actual[0].token.should.equal( expected[0].token );
        actual[1].name.should.equal( expected[1].name );
        actual[1].type.should.equal( expected[1].type );
        actual[1].token.should.equal( expected[1].token );
        response.statusCode.should.equal( 200 );

        done();
      } );
    } );
  } );

  describe( 'DELETE to /registrations/:id/devices/:eid', function() {
    it( 'should delete a device from a registration when called with an existing registration id and device id', function( done ) {
      var request = localhost.request( 'DELETE', '/registrations/' + registrationId + '/devices/' + newId, {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
      request.write( '{}' );

      requestHandler.handle( request, function( err, response ) {
        response.statusCode.should.equal( 200 );

        // Check that it did actually delete the device from the registration
        var request = localhost.request( 'GET', '/registrations/' + registrationId + '/devices', {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );

        requestHandler.handle( request, function( err, response ) {
          var actual = JSON.parse( response.body );

          actual.should.be.length(1);
          response.statusCode.should.equal( 200 );

          done();
        } );
      } );
    } );
  } );
} );
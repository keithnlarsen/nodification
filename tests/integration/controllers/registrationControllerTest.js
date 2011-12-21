describe( 'nodification.tests.integration.controllers.registration', function () {

  var http = require( 'http' );
  var should = require( 'should' );
  var stub = require( 'stub.js' );
  var voiceMailJSON = JSON.parse( "{\"name\":\"Voicemail\",\"registrationUrl\":\"http://something:2343/register\",\"userName\": \"username\",\"password\": \"password\"}" );
  var voiceMailId;
  var createJSON = JSON.parse( "{\"notificationType\":\" \",\"key\":\"4039819330\",\"registrationConfirmed\":false,\"devices\":[{ \"type\":\"ios\",\"name\":\"test\",\"token\":\"123ef0b00000000\"}] }" );
  var updateJSON = JSON.parse( "{\"notificationType\":\" \",\"key\":\"4039819330\",\"registrationConfirmed\":true,\"devices\":[{ \"type\":\"android\",\"name\":\"test2\",\"token\":\"1234132414132\"}] }" );
  var updateDevicesJSON = JSON.parse( "{\"devices\":[{ \"type\":\"ios\",\"name\":\"testios\",\"token\":\"ios123ef0b00000000\"},{ \"type\":\"android\",\"name\":\"testandroid\",\"token\":\"android209304823084\"}] }" );
  var newId = '';
  var notificationType;
  var registration;
  var app;

  var localhost = http.createClient( 3000, 'localhost' );
  var requestHandler = require( '../../../libs/requestHandler' );

  before( function ( done ) {
    app = require( '../../../app' );
    app.listen( 3000 );

    // Delay to make sure that node server has time to start up on slower computers before running the tests.
    setTimeout( function () {

      // Hardcode a stub gateway to register voicemail with
      app.gateways.notificationRegistration.Voicemail = { register: stub.async( null, true ) };

      // Just in case something bad happened, let's clear out the database
      app.models.registration.getModel().remove( {}, function ( err ) {
        app.models.notificationType.getModel().remove( {}, function ( err ) {
          // populate the database with a new notificationType
          app.models.notificationType.getModel().create( voiceMailJSON, function ( err, voiceMail ) {
            // setup our test records to use that notificationType
            voiceMailId = voiceMail._id.toString();
            createJSON.notificationType = voiceMailId;
            updateJSON.notificationType = voiceMailId;
            done( err )
          } );
        } );
      } );
    }, 250 );
  } );

  after( function ( done ) {
    // Clear out our database once we are done
    app.models.registration.getModel().remove( {}, function ( err ) {
      app.models.notificationType.getModel().remove( {}, function ( err ) {
        done( err )
      } );
    } );
  } );

  describe( 'PUT to /registrations', function () {
    it( 'should create a new Registration', function ( done ) {
      var request = localhost.request( 'PUT', '/registrations', {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
      request.write( JSON.stringify( createJSON ) );

      requestHandler.handle( request, function ( err, response ) {
        var actual = JSON.parse( response.body );
        var expected = createJSON;

        newId = actual._id.toString();
        actual.notificationType._id.toString().should.equal( voiceMailId );
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

  describe( 'GET to /registrations/:id', function () {
    it( 'should return a single Registration when given an existing Id', function ( done ) {
      var request = localhost.request( 'GET', '/registrations/' + newId, {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );

      requestHandler.handle( request, function ( err, response ) {
        var actual = JSON.parse( response.body );
        var expected = createJSON;

        actual.notificationType._id.should.equal( voiceMailId );
        actual.notificationType.name.should.equal( voiceMailJSON.name );
        actual.key.should.equal( expected.key );
        // This field gets updated to be true because it registers with the back end server (or at least a stub)
        actual.registrationConfirmed.should.equal( true );
        actual.devices[0].name.should.equal( expected.devices[0].name );
        actual.devices[0].type.should.equal( expected.devices[0].type );
        actual.devices[0].token.should.equal( expected.devices[0].token );
        response.statusCode.should.equal( 200 );

        done();
      } );
    } );
    it( 'should return 404 NotFound when given a non-existing Id', function ( done ) {
      var request = localhost.request( 'GET', '/registrations/111111111111111111111111', {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );

      requestHandler.handle( request, function ( err, response ) {
        response.statusCode.should.equal( 404 );

        done();
      } );
    } );
  } );

  describe( 'POST to /registrations/:id', function () {
    it( 'should update an existing Registration', function ( done ) {
      var request = localhost.request( 'POST', '/registrations/' + newId, {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
      request.write( JSON.stringify( updateJSON ) );

      requestHandler.handle( request, function ( err, response ) {
        var actual = JSON.parse( response.body );
        var expected = updateJSON;

        actual.notificationType._id.toString().should.equal( voiceMailId );
        actual.key.should.equal( expected.key );
        // This field gets updated to be true because it registers with the back end server (or at least a stub)
        actual.registrationConfirmed.should.equal( true );
        actual.devices.should.have.length( 1 );
        actual.devices[0].name.should.equal( expected.devices[0].name );
        actual.devices[0].type.should.equal( expected.devices[0].type );
        actual.devices[0].token.should.equal( expected.devices[0].token );
        response.statusCode.should.equal( 200 );

        done();
      } );
    } );
  } );

  describe( 'POST to /registrations/:id', function () {
    it( 'should update the devices collection of an existing Registration', function ( done ) {
      var request = localhost.request( 'POST', '/registrations/' + newId, {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
      request.write( JSON.stringify( updateDevicesJSON ) );

      requestHandler.handle( request, function ( err, response ) {
        var actual = JSON.parse( response.body );
        var expected = updateJSON;
        var expectedDevices = updateDevicesJSON;

        actual.notificationType._id.toString().should.equal( voiceMailId );
        actual.key.should.equal( expected.key );
        // This field gets updated to be true because it registers with the back end server (or at least a stub)
        actual.registrationConfirmed.should.equal( true );
        actual.devices.should.have.length( 2 );
        actual.devices[0].name.should.equal( expectedDevices.devices[0].name );
        actual.devices[0].type.should.equal( expectedDevices.devices[0].type );
        actual.devices[0].token.should.equal( expectedDevices.devices[0].token );
        actual.devices[1].name.should.equal( expectedDevices.devices[1].name );
        actual.devices[1].type.should.equal( expectedDevices.devices[1].type );
        actual.devices[1].token.should.equal( expectedDevices.devices[1].token );
        response.statusCode.should.equal( 200 );

        done();
      } );
    } );
  } );

  describe( 'GET to /registrations', function () {
    it( 'should return all registrations', function ( done ) {
      var request = localhost.request( 'GET', '/registrations', {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );

      requestHandler.handle( request, function ( err, response ) {
        var actual = JSON.parse( response.body );
        var expected = updateJSON;
        var expectedDevices = updateDevicesJSON;

        actual[0]._id.should.equal( newId );
        actual[0].notificationType._id.should.equal( voiceMailId );
        actual[0].notificationType.name.should.equal( voiceMailJSON.name );
        actual[0].key.should.equal( expected.key );
        // This field gets updated to be true because it registers with the back end server (or at least a stub)
        actual[0].registrationConfirmed.should.equal( true );
        actual[0].devices.should.have.length( 2 );
        actual[0].devices[0].name.should.equal( expectedDevices.devices[0].name );
        actual[0].devices[0].type.should.equal( expectedDevices.devices[0].type );
        actual[0].devices[0].token.should.equal( expectedDevices.devices[0].token );
        actual[0].devices[1].name.should.equal( expectedDevices.devices[1].name );
        actual[0].devices[1].type.should.equal( expectedDevices.devices[1].type );
        actual[0].devices[1].token.should.equal( expectedDevices.devices[1].token );
        response.statusCode.should.equal( 200 );

        done();
      } );
    } );
  } );

  describe( 'DELETE to /registrations/:id', function () {
    it( 'should delete registrations when called with an existing Id', function ( done ) {
      var request = localhost.request( 'DELETE', '/registrations/' + newId, {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
      request.write( '{}' );

      requestHandler.handle( request, function ( err, response ) {
        response.statusCode.should.equal( 200 );

        done();
      } );
    } );
  } );
} );
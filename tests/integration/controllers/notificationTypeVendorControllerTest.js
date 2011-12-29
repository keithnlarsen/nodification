describe( 'nodification.tests.integration.controllers.notificationTypeVendor', function () {

  var http = require( 'http' );
  var should = require( 'should' );
  var voiceMailJSON = JSON.parse( "{\"name\":\"VoiceMail\",\"registrationUrl\":\"url\",\"userName\": \"username\",\"password\": \"password\"}" );
  var voiceMailId;

  var createJSON = JSON.parse( "{ \"type\":\"ios\",\"name\":\"testios\",\"keyData\":\"iosKey123ef0b00000000\",\"certData\":\"iosCert123ef0b00000000\",\"pushGatewayUrl\":\"https://ios.test.com:1234\",\"feedbackGatewayUrl\":\"https://iosfeedback.test.com:1234\",\"cacheLength\":0}" );
  var createJSON2 = JSON.parse( "{ \"type\":\"android\",\"name\":\"testandroid\",\"keyData\":\"androidKey123ef0b00000000\",\"certData\":\"androidCert123ef0b00000000\",\"pushGatewayUrl\":\"https://android.test.com:1234\",\"feedbackGatewayUrl\":\"https://androidfeedback.test.com:1234\",\"cacheLength\":0}" );
  var updateJSON = JSON.parse( "{ \"type\":\"ios\",\"name\":\"testios2\",\"keyData\":\"iosKey123ef0b00000000\",\"certData\":\"iosCert123ef0b00000000\",\"pushGatewayUrl\":\"https://ios.test.com:5678\",\"feedbackGatewayUrl\":\"https://iosfeedback.test.com:5678\",\"cacheLength\":0}" );

  var newId = '';
  var notificationType;
  var app;

  var localhost = http.createClient( 3000, 'localhost' );
  var requestHandler = require( '../../../libs/requestHandler' );

  before( function ( done ) {
    app = require( '../../../app' );
    app.listen( 3000 );

    // Delay to make sure that node server has time to start up on slower computers before running the tests.
    setTimeout( function () {
      // Just in case something bad happened, let's clear out the database
      app.models.notificationType.getModel().remove( {}, function ( err ) {
        // populate the database with a new notificationType
        app.models.notificationType.getModel().create( voiceMailJSON, function ( err, voiceMail ) {
          voiceMailId = voiceMail._id.toString();
          done( err );
        } );
      } );
    }, 250 );
  } );

  after( function ( done ) {
    // Clear out our database once we are done
    app.models.notificationType.getModel().remove( {}, function ( err ) {
      done( err )
    } );
  } );

  describe( 'PUT to /notificationTypes/:id/vendors', function () {
    it( 'should create a new Vendor', function ( done ) {
      var request = localhost.request( 'PUT', '/notificationTypes/' + voiceMailId + '/vendors', {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
      request.write( JSON.stringify( createJSON ) );

      requestHandler.handle( request, function ( err, response ) {
        var actual = JSON.parse( response.body );
        var expected = createJSON;

        newId = actual._id.toString();
        actual.name.should.equal( expected.name );
        actual.type.should.equal( expected.type );
        actual.keyData.should.equal( expected.keyData );
        actual.certData.should.equal( expected.certData );
        actual.pushGatewayUrl.should.equal( expected.pushGatewayUrl );
        actual.feedbackGatewayUrl.should.equal( expected.feedbackGatewayUrl );
        actual.cacheLength.should.equal( expected.cacheLength );
        response.statusCode.should.equal( 201 );

        done();
      } );
    } );
    it( 'should create a second new Vendor', function ( done ) {
      var request = localhost.request( 'PUT', '/notificationTypes/' + voiceMailId + '/vendors', {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
      request.write( JSON.stringify( createJSON2 ) );

      requestHandler.handle( request, function ( err, response ) {
        var actual = JSON.parse( response.body );
        var expected = createJSON2;

        actual.name.should.equal( expected.name );
        actual.type.should.equal( expected.type );
        actual.keyData.should.equal( expected.keyData );
        actual.certData.should.equal( expected.certData );
        actual.pushGatewayUrl.should.equal( expected.pushGatewayUrl );
        actual.feedbackGatewayUrl.should.equal( expected.feedbackGatewayUrl );
        actual.cacheLength.should.equal( expected.cacheLength );
        response.statusCode.should.equal( 201 );

        done();
      } );
    } );
  } );

  describe( 'GET to /notificationTypes/:id/vendors/:eid', function () {
    it( 'should get a Vendor given an existing notification type id and vendor id', function ( done ) {
      var request = localhost.request( 'GET', '/notificationTypes/' + voiceMailId + '/vendors/' + newId, {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );

      requestHandler.handle( request, function ( err, response ) {
        var actual = JSON.parse( response.body );
        var expected = createJSON;

        actual.name.should.equal( expected.name );
        actual.type.should.equal( expected.type );
        actual.keyData.should.equal( expected.keyData );
        actual.certData.should.equal( expected.certData );
        actual.pushGatewayUrl.should.equal( expected.pushGatewayUrl );
        actual.feedbackGatewayUrl.should.equal( expected.feedbackGatewayUrl );
        actual.cacheLength.should.equal( expected.cacheLength );
        response.statusCode.should.equal( 200 );

        done();
      } );
    } );
  } );

  describe( 'POST to /notificationTypes/:id/vendors/:eid', function () {
    it( 'should update an existing Vendor', function ( done ) {
      var request = localhost.request( 'POST', '/notificationTypes/' + voiceMailId + '/vendors/' + newId, {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
      request.write( JSON.stringify( updateJSON ) );

      requestHandler.handle( request, function ( err, response ) {
        var actual = JSON.parse( response.body );
        var expected = updateJSON;

        actual.name.should.equal( expected.name );
        actual.type.should.equal( expected.type );
        actual.keyData.should.equal( expected.keyData );
        actual.certData.should.equal( expected.certData );
        actual.pushGatewayUrl.should.equal( expected.pushGatewayUrl );
        actual.feedbackGatewayUrl.should.equal( expected.feedbackGatewayUrl );
        actual.cacheLength.should.equal( expected.cacheLength );
        response.statusCode.should.equal( 200 );

        done();
      } );
    } );
  } );

  describe( 'GET to /notificationTypes/:id/vendors', function () {
    it( 'should get the full list of Vendors for a given notification type id', function ( done ) {
      var request = localhost.request( 'GET', '/notificationTypes/' + voiceMailId + '/vendors', {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );

      requestHandler.handle( request, function ( err, response ) {
        var actual = JSON.parse( response.body );
        var expected = {};
        expected[0] = updateJSON;
        expected[1] = createJSON2;

        actual.should.be.length( 2 );
        actual[0].name.should.equal( expected[0].name );
        actual[0].type.should.equal( expected[0].type );
        actual[0].keyData.should.equal( expected[0].keyData );
        actual[0].certData.should.equal( expected[0].certData );
        actual[0].pushGatewayUrl.should.equal( expected[0].pushGatewayUrl );
        actual[0].feedbackGatewayUrl.should.equal( expected[0].feedbackGatewayUrl );
        actual[0].cacheLength.should.equal( expected[0].cacheLength );
        actual[1].name.should.equal( expected[1].name );
        actual[1].type.should.equal( expected[1].type );
        actual[1].keyData.should.equal( expected[1].keyData );
        actual[1].certData.should.equal( expected[1].certData );
        actual[1].pushGatewayUrl.should.equal( expected[1].pushGatewayUrl );
        actual[1].feedbackGatewayUrl.should.equal( expected[1].feedbackGatewayUrl );
        actual[1].cacheLength.should.equal( expected[1].cacheLength );
        response.statusCode.should.equal( 200 );

        done();
      } );
    } );
  } );

  describe( 'DELETE to /notificationTypes/:id/vendors/:eid', function () {
    it( 'should delete a vendor from a notification type when called with an existing notification type id and vendor id', function ( done ) {
      var request = localhost.request( 'DELETE', '/notificationTypes/' + voiceMailId + '/vendors/' + newId, {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
      request.write( '{}' );

      requestHandler.handle( request, function ( err, response ) {
        response.statusCode.should.equal( 200 );

        // Check that it did actually delete the vendor from the notification type
        var request = localhost.request( 'GET', '/notificationTypes/' + voiceMailId + '/vendors', {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );

        requestHandler.handle( request, function ( err, response ) {
          var actual = JSON.parse( response.body );
          var expected = createJSON2;

          actual.should.be.length( 1 );
          actual[0].name.should.equal( expected.name );
          actual[0].type.should.equal( expected.type );
          actual[0].keyData.should.equal( expected.keyData );
          actual[0].certData.should.equal( expected.certData );
          actual[0].pushGatewayUrl.should.equal( expected.pushGatewayUrl );
          actual[0].feedbackGatewayUrl.should.equal( expected.feedbackGatewayUrl );
          actual[0].cacheLength.should.equal( expected.cacheLength );

          response.statusCode.should.equal( 200 );

          done();
        } );
      } );
    } );
  } );
} );
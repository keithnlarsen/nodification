describe( 'nodification.tests.unit.gateways.notificationRegistration', function () {

  var should = require( 'should' );
  var stub = require( 'stub.js' );
  var registrationGateway = require( '../../../gateways/notificationRegistrationGateway' );
  var mockClient = {};
  var mockRequest = {};
  var mockRequestHandler = {};
  var mockResponse = { statusCode: null, body: '' };
  var expectedMessage;
  var mockRegistration = {
    key: 'somekey'
  };
  var mockNotificationType = {
    registrationUrl: 'http://hostname.sjrb.ca/urlpath',
    name: 'somename'
  };
  var eventNotificationUrl = 'http://localhost/events';

  beforeEach( function ( done ) {
    mockRequest.write = stub.sync();
    mockRequestHandler.handle = stub.async( null, mockResponse );
    mockClient.request = stub.sync( null, mockRequest );

    expectedMessage = {
      'registrationKey': mockRegistration.key,
      'eventNotificationUrl': eventNotificationUrl,
      'notificationType': mockNotificationType.name
    };

    registrationGateway.init( {
      client: mockClient,
      requestHandler: mockRequestHandler,
      eventNotificationUrl: eventNotificationUrl
    } );

    done();
  } );

  afterEach( function ( done ) {
    done();
  } );

  describe( '.register( registration, notificationType, callBack )', function () {
    it( 'should return sucess when calling registrationUrl for given notificationType and getting http status code 200 back', function ( done ) {

      mockResponse.statusCode = 200;

      registrationGateway.register( mockRegistration, mockNotificationType, function ( err, success ) {
        mockRequest.write.called.withArguments( JSON.stringify( expectedMessage ) );
        mockRequestHandler.handle.called.withArguments( mockRequest );
        mockClient.request.called.withArguments( 'GET', '/urlpath', { 'Host': 'hostname.sjrb.ca', 'Accept': 'application/json', 'Content-Type': 'application/json' } );
        success.should.equal( true );
        done( err );
      } );

    } );

    it( 'should return sucess when calling registrationUrl for given notificationType and getting http status code 201 back', function ( done ) {

      mockResponse.statusCode = 201;

      registrationGateway.register( mockRegistration, mockNotificationType, function ( err, success ) {
        mockRequest.write.called.withArguments( JSON.stringify( expectedMessage ) );
        mockRequestHandler.handle.called.withArguments( mockRequest );
        mockClient.request.called.withArguments( 'GET', '/urlpath', { 'Host': 'hostname.sjrb.ca', 'Accept': 'application/json', 'Content-Type': 'application/json' } );
        success.should.equal( true );
        done( err );
      } );

    } );

    it( 'should return error when calling registrationUrl for given notificationType and getting http status code 500 back', function ( done ) {
      mockResponse.statusCode = 500;
      mockResponse.body = 'mock error';

      registrationGateway.register( mockRegistration, mockNotificationType, function ( err, success ) {
        mockRequest.write.called.withArguments( JSON.stringify( expectedMessage ) );
        mockRequestHandler.handle.called.withArguments( mockRequest );
        mockClient.request.called.withArguments( 'GET', '/urlpath', { 'Host': 'hostname.sjrb.ca', 'Accept': 'application/json', 'Content-Type': 'application/json' } );
        success.should.equal( false );
        err.message.should.match( /mock error/ );
        done();
      } );

    } );
  } );
} );
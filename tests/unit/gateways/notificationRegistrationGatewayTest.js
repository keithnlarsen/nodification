describe( 'Nodification.Tests.Unit.Gateways.NotificationRegistrationGateway', function() {

  var should = require( 'should' );
  var Stub = require( '../../stub' );
  var registrationGateway = require( '../../../gateways/notificationRegistrationGateway' );
  var mockClient = {};
  var mockRequest = {};
  var mockRequestHandler = {};
  var mockResponse = { statusCode: null, body: '' };
  var mockRegistration = {
    key: 'somekey'
  };
  var mockNotificationType = {
    registrationUrl: 'http://hostname.sjrb.ca/urlpath',
    name: 'somename'
  };
  var eventNotificationUrl = 'http://localhost/events';

  beforeEach( function( done ) {
    mockRequest.write = new Stub();
    mockRequestHandler.handle = new Stub( null, mockResponse );
    mockClient.request = new Stub( null, mockRequest );
    done();
  } );

  afterEach( function( done ) {
    done();
  } );

  describe( '.register( registration, notificationType, callBack )', function() {
    it( 'should return sucess when calling registrationUrl for given notificationType and getting http status code 200 back', function( done ) {

      mockResponse.statusCode = 200;

      var expectedMessage = {
        'registrationKey': mockRegistration.key,
        'eventNotificationUrl': eventNotificationUrl,
        'notificationType': mockNotificationType.name
      };

      registrationGateway.init( {
        client: mockClient,
        requestHandler: mockRequestHandler,
        eventNotificationUrl: eventNotificationUrl
      } );

      registrationGateway.register( mockRegistration, mockNotificationType, function ( err, success ) {
        mockRequest.write.called.withArguments( JSON.stringify( expectedMessage ) );
        mockRequestHandler.handle.called.withArguments( mockRequest );
        mockClient.request.called.withArguments( 'GET', '/urlpath', { 'Host': 'hostname.sjrb.ca', 'Accept': 'application/json', 'Content-Type': 'application/json' } );
        success.should.equal(true);
        done( err );
      } );

    } );

    it( 'should return sucess when calling registrationUrl for given notificationType and getting http status code 201 back', function( done ) {

      mockResponse.statusCode = 201;

      var expectedMessage = {
        'registrationKey': mockRegistration.key,
        'eventNotificationUrl': eventNotificationUrl,
        'notificationType': mockNotificationType.name
      };

      registrationGateway.init( {
        client: mockClient,
        requestHandler: mockRequestHandler,
        eventNotificationUrl: eventNotificationUrl
      } );

      registrationGateway.register( mockRegistration, mockNotificationType, function ( err, success ) {
        mockRequest.write.called.withArguments( JSON.stringify( expectedMessage ) );
        mockRequestHandler.handle.called.withArguments( mockRequest );
        mockClient.request.called.withArguments( 'GET', '/urlpath', { 'Host': 'hostname.sjrb.ca', 'Accept': 'application/json', 'Content-Type': 'application/json' } );
        success.should.equal(true);
        done( err );
      } );

    } );

    it( 'should return error when calling registrationUrl for given notificationType and getting http status code 500 back', function( done ) {
      mockResponse.statusCode = 500;
      mockResponse.body = 'mock error';

      var expectedMessage = {
        'registrationKey': mockRegistration.key,
        'eventNotificationUrl': eventNotificationUrl,
        'notificationType': mockNotificationType.name
      };

      registrationGateway.init( {
        client: mockClient,
        requestHandler: mockRequestHandler,
        eventNotificationUrl: eventNotificationUrl
      } );

      registrationGateway.register( mockRegistration, mockNotificationType, function ( err, success ) {
        mockRequest.write.called.withArguments( JSON.stringify( expectedMessage ) );
        mockRequestHandler.handle.called.withArguments( mockRequest );
        mockClient.request.called.withArguments( 'GET', '/urlpath', { 'Host': 'hostname.sjrb.ca', 'Accept': 'application/json', 'Content-Type': 'application/json' } );
        success.should.equal(false);
        err.message.should.match( /mock error/ );
        done();
      } );

    } );
  } );
} );
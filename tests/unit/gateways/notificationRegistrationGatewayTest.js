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

  beforeEach( function( done ) {
    mockRequest.write = new Stub();
    mockRequestHandler.handle = new Stub(null, mockResponse);
    mockClient.request = new Stub(null, mockRequest);
    done( );
  } );

  afterEach( function( done ) {
    done( );
  } );

  describe( '.register( registration, notificationType, callBack )', function() {
    it( 'should return sucess when calling registrationUrl for given notificationType and getting http status code 200 back', function( done ) {

      mockResponse.statusCode = 200;

      var options = {
        client: mockClient,
        requestHandler: mockRequestHandler,
        eventNotificationUrl: 'someUrl'
      };

      var message = {
        'registrationKey': mockRegistration.key,
        'eventNotificationUrl': options.eventNotificationUrl,
        'notificationType': mockNotificationType.name
      };

      registrationGateway.init(options);
      registrationGateway.register(mockRegistration, mockNotificationType, function (err, success){
        mockRequest.write.called.withAnyArguments(message);
        mockRequestHandler.handle.called.withArguments(mockRequest);
        mockClient.request.called.withArguments( 'GET', '/urlpath', { 'Host': 'hostname.sjrb.ca', 'Accept': 'application/json', 'Content-Type': 'application/json' } );
        success.should.be.true;
        done(err);
      });

    } );

    it( 'should return sucess when calling registrationUrl for given notificationType and getting http status code 201 back', function( done ) {

      mockResponse.statusCode = 201;

      var options = {
        client: mockClient,
        requestHandler: mockRequestHandler,
        eventNotificationUrl: 'someUrl'
      };

      var message = {
        'registrationKey': mockRegistration.key,
        'eventNotificationUrl': options.eventNotificationUrl,
        'notificationType': mockNotificationType.name
      };

      registrationGateway.init(options);
      registrationGateway.register(mockRegistration, mockNotificationType, function (err, success){
        mockRequest.write.called.withAnyArguments(message);
        mockRequestHandler.handle.called.withArguments(mockRequest);
        mockClient.request.called.withArguments( 'GET', '/urlpath', { 'Host': 'hostname.sjrb.ca', 'Accept': 'application/json', 'Content-Type': 'application/json' } );
        success.should.be.true;
        done(err);
      });

    } );

    it( 'should return error when calling registrationUrl for given notificationType and getting http status code 500 back', function( done ) {
      mockResponse.statusCode = 500;
      mockResponse.body = 'mock error';

      var options = {
        client: mockClient,
        requestHandler: mockRequestHandler,
        eventNotificationUrl: 'someUrl'
      };

      var message = {
        'registrationKey': mockRegistration.key,
        'eventNotificationUrl': options.eventNotificationUrl,
        'notificationType': mockNotificationType.name
      };

      registrationGateway.init(options);
      registrationGateway.register(mockRegistration, mockNotificationType, function (err, success){
        mockRequest.write.called.withAnyArguments(message);
        mockRequestHandler.handle.called.withArguments(mockRequest);
        mockClient.request.called.withArguments( 'GET', '/urlpath', { 'Host': 'hostname.sjrb.ca', 'Accept': 'application/json', 'Content-Type': 'application/json' } );
        success.should.be.false;
        err.message.should.match(/mock error/);
        done();
      });

    } );
  } );
} );
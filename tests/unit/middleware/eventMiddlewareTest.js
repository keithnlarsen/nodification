describe( 'Nodification.Tests.Unit.Middleware.EventMiddleware', function() {

  var should = require( 'should' );
  var stub = require( '../../stub' );
  var eventMiddleware = require( '../../../middleware/eventMiddleware' );
  var mockEvent;
  var mockRegistration;
  var mockApp;
  var mockApnGateway;

  beforeEach( function( done ) {
    mockEvent = {
      _id: '111111',
      notificationType: {
        _id: '987654321'
      },
      registrationKey: 'abcd'
    };
    mockRegistration = {
      _id: '123456789',
      key: 'abcd',
      notificationType: {
        _id: '987654321'
      },
      devices: [ {
        _id: '12121212',
        name: 'test1',
        type: 'ios'
      },{
        _id: '34343434',
        name: 'test2',
        type: 'android'
      },{
        id: '56565656',
        name:'test3',
        type:'ios'
      } ]
    };

    mockApp = {
      controllers: {
        registration: {
          model: {
            find: stub.sync( null, { where: stub.sync( null, { where: stub.sync( null, { exec: stub.async( null, mockRegistration ) } ) } ) } )
          }
        },
        event: {
          afterHook : stub.sync()
        }
      }
    };

    mockApnGateway = {
      sendNotification: stub.sync( null, true )
    };

    done();
  } );

  afterEach( function( done ) {
    done();
  } );

  describe( '.init( controllers ) ', function() {
    it( 'should bind the after create hook to the afterCreate function', function( done ) {
      eventMiddleware.init( mockApp );

      mockApp.controllers.event.afterHook.called.withArguments( 'create', eventMiddleware.afterCreate );

      done();
    } );
  } );

  describe( '.afterCreate( err, event ) ', function() {
    it( 'should send only apple devices to the apn gateway', function( done ) {
      eventMiddleware.init( mockApp, mockApnGateway );
      eventMiddleware.afterCreate( null, mockEvent );

      mockApnGateway.sendNotification.called.count( 2 );
      mockApnGateway.sendNotification.called.time(1).withArguments( mockEvent, mockRegistration.devices[0] );
      mockApnGateway.sendNotification.called.time(2).withArguments( mockEvent, mockRegistration.devices[2] );

      done();
    } );
  } );

} );
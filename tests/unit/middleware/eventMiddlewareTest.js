describe( 'nodification.tests.unit.middleware.event', function () {

  var should = require( 'should' );
  var stub = require( 'stub.js' );
  var eventMiddleware = require( '../../../middleware/eventMiddleware' );
  var mockEvent;
  var mockRegistration;
  var mockApp;
  var mockApnGateway;

  beforeEach( function ( done ) {
    mockEvent = {
      _id: '111111',
      notificationType: {
        _id: '987654321',
        name: 'notificationTypeName'
      },
      registrationKey: 'abcd'
    };
    mockRegistration = {
      _id: '123456789',
      key: 'abcd',
      notificationType: {
        _id: '987654321',
        name: 'notificationTypeName'
      },
      devices: [
        {
          _id: '12121212',
          name: 'test1',
          type: 'ios'
        },
        {
          _id: '34343434',
          name: 'test2',
          type: 'android'
        },
        {
          id: '56565656',
          name: 'test3',
          type: 'ios'
        }
      ]
    };

    mockApnGateway = {
      sendNotification: stub.sync( null, true )
    };

    mockApp = {
      controllers: {
        registration: {
          model: {
            find: stub.sync( null, { where: stub.sync( null, { where: stub.sync( null, { exec: stub.async( null, mockRegistration ) } ) } ) } )
          }
        },
        event: {
          afterHook: stub.sync()
        },
        vendor: {
          model: {
            find: stub.sync( null, { where: stub.sync( null, { where: stub.sync( null, { exec: stub.async( null, mockEvent ) } ) } ) } )
          }
        }
      },
      gateways: {
        apn: { notificationTypeName: mockApnGateway }
      }
    };

    done();
  } );

  afterEach( function ( done ) {
    done();
  } );

  describe( '.init( controllers ) ', function () {
    it( 'should bind the after create hook to the afterCreate function', function ( done ) {
      eventMiddleware.init( mockApp );

      mockApp.controllers.event.afterHook.called.withArguments( 'insert', eventMiddleware.afterInsert );

      done();
    } );
  } );

  describe( '.afterInsert( err, event ) ', function () {
    it( 'should send only apple devices to the apn gateway', function ( done ) {
      eventMiddleware.init( mockApp );
      eventMiddleware.afterInsert( null, mockEvent, function ( err, count ) {
        mockApnGateway.sendNotification.called.count( 2 );
        mockApnGateway.sendNotification.called.time( 1 ).withArguments( mockEvent, mockRegistration.devices[0] );
        mockApnGateway.sendNotification.called.time( 2 ).withArguments( mockEvent, mockRegistration.devices[2] );

        done();
      } );
    } );
  } );

} );
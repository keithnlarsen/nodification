describe( 'nodification.tests.unit.middleware.event', function () {

  var should = require( 'should' );
  var stub = require( 'stub.js' );
  var eventMiddleware = require( '../../../middleware/eventMiddleware' );
  var mockEvent;
  var mockRegistration;
  var mockNotificationType;
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
          type: 'ios',
          token: 'deviceToken 12121212'
        },
        {
          _id: '34343434',
          name: 'test2',
          type: 'android',
          token: 'deviceToken 34343434'
        },
        {
          id: '56565656',
          name: 'test3',
          type: 'ios',
          token: 'deviceToken 56565656'
        }
      ]
    };

    mockNotificationType = {
      _id: '987654321',
      name: 'notificationTypeName',
      vendors: [
        {
          type: 'ios',
          name: 'Apple Voicemail',
          keyData: 'pretend key',
          certData: 'pretend cert',
          pushGatewayUrl: 'https://gateway.sandbox.push.apple.com:2195',
          feedbackGatewayUrl: 'https://feedback.sandbox.push.apple.com:2196',
          cacheLength: 0
        },
        {
          type: 'android',
          name: 'Android Voicemail',
          keyData: 'pretend key',
          certData: 'pretend cert',
          pushGatewayUrl: 'https://gateway.sandbox.push.android.com:2195',
          feedbackGatewayUrl: 'https://feedback.sandbox.push.android.com:2196',
          cacheLength: 0
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
            find: stub.sync( null, { where: stub.sync( null, { where: stub.sync( null, { exec: stub.async( null, [mockRegistration] ) } ) } ) } )
          }
        },
        notificationType: {
          model: {
            findById: stub.sync( null, { exec: stub.async( null, mockNotificationType ) } )
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
        ios: { notificationTypeName: mockApnGateway }
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

  describe( '.afterInsert( err, event ) ', function() {
    it( 'should return error if given a non-existent gateway', function( done ) {
      eventMiddleware.init( mockApp );
      eventMiddleware.afterInsert( null, mockEvent, function ( err, count ) {
        err[0].message.should.equal('Invalid Gateway: androidGateway does not exist. test2 could not be notified.');
        done();
      });

    });
  })

} );
describe( 'nodification.tests.unit.middleware.registration', function () {

  var should = require( 'should' );
  var stub = require( 'stub.js' );
  var registrationMiddleware = require( '../../../middleware/registrationMiddleware' );
  var mockApp = {};
  var mockRegistration;
  var mockNotificationType;
  var mockRegistrationGateway;

  beforeEach( function ( done ) {
    mockNotificationType = {
      _id: '987654321',
      name: 'testNotification',
      registrationUrl: 'http://localhost:2343/register'
    };

    mockRegistration = {
      _id: '123456789',
      notificationType: mockNotificationType
    };

    mockRegistrationGateway = {
      register: stub.async( null, true )
    };

    mockApp = {
      models: {
        notificationType: {
          getModel: stub.sync( null, { findById: stub.async( null, mockNotificationType ) } )
        }
      },
      controllers: {
        registration: {
          afterHook: stub.sync(),
          model: {
            update: stub.async( null, 1 )
          }
        }
      },
      gateways: {
        notificationRegistration: {
          testNotification: mockRegistrationGateway
        }
      }
    };

    done();
  } );

  afterEach( function ( done ) {
    done();
  } );

  describe( '.init( controllers ) ', function () {
    it( 'should bind the after create hook to the afterCreate function', function ( done ) {
      registrationMiddleware.init( mockApp );

      mockApp.controllers.registration.afterHook.called.withArguments( 'insert', registrationMiddleware.afterInsert );

      done();
    } );
  } );

  describe( '.afterInsert( err, registration ) ', function () {
    it( 'should do a bunch of stuff', function ( done ) {
      registrationMiddleware.init( mockApp );
      registrationMiddleware.afterInsert( null, mockRegistration, function () {
        mockApp.models.notificationType.getModel.called.withNoArguments();
        mockApp.models.notificationType.getModel().findById.called.withArguments( mockNotificationType._id );
        mockRegistrationGateway.register.called.withArguments( mockRegistration, mockNotificationType );
        mockApp.controllers.registration.model.update.called.withArguments( { _id: mockRegistration._id }, { registrationConfirmed: true } );

        done();
      } );

    } );
  } );
} );
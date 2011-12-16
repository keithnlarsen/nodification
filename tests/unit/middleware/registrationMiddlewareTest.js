describe( 'Nodification.Tests.Unit.Middleware.RegistrationMiddleware', function() {

  var should = require( 'should' );
  var stub = require( '../../stub' );
  var registrationMiddleware = require( '../../../middleware/registrationMiddleware' );
  var mockRegistration;
  var mockNotificationType;
  var mockControllers;
  var mockRegistrationGateway;

  beforeEach( function( done ) {
    mockRegistration = {
      _id: '123456789',
      notificationType: {
        _id: '987654321'
      }
    };

    mockNotificationType = {
      _id: '987654321'
    };

    mockControllers = {
      notificationType: {
        getQuery: stub.sync( null, { exec: stub.async( null, mockNotificationType ) })
      },
      registration: {
        afterHook : stub.sync(),
        model: {
          update: stub.async( null, 1 )
        }
      }
    };

    mockRegistrationGateway = {
      register: stub.async( null, true )
    };

    done();
  } );

  afterEach( function( done ) {
    done();
  } );

  describe( '.init( controllers ) ', function() {
    it( 'should bind the after create hook to the afterCreate function', function( done ) {
      registrationMiddleware.init( mockControllers );

      mockControllers.registration.afterHook.called.withArguments('create', registrationMiddleware.afterCreate);

      done();
    } );
  } );

  describe( '.afterCreate( err, registration ) ', function() {
    it( 'should do a bunch of stuff', function( done ) {
      registrationMiddleware.init(mockControllers, mockRegistrationGateway);
      registrationMiddleware.afterCreate( null, mockRegistration );

      mockControllers.notificationType.getQuery.called.withArguments( { params: { id: mockNotificationType._id } });
      mockControllers.notificationType.getQuery().exec.called.withNoArguments();
      mockRegistrationGateway.register.called.withArguments( mockRegistration, mockNotificationType );
      mockControllers.registration.model.update.called.withArguments( { _id: mockRegistration._id }, { registrationConfirmed: true } );

      done();
    } );
  } );
} );
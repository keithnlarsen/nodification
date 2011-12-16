describe( 'Nodification.Tests.Unit.Middleware.RegistrationMiddleware', function() {

  var should = require( 'should' );
  var Stub = require( '../../stub' );
  var registrationMiddleware = require( '../../../middleware/registrationMiddleware' );

  beforeEach( function( done ) {
    done();
  } );

  afterEach( function( done ) {
    done();
  } );

  describe( '.init( controllers ) ', function() {
    it( 'should bind the create event to the postCreate function', function( done ) {

      var controllers = {
        registration : {
          post : new Stub(null, null, true)
        }
      };

      registrationMiddleware.init( controllers );

      controllers.registration.post.called.withArguments('create', registrationMiddleware.postCreate);
      done();

    } );
  } );

  describe( '.postCreate( err, registration ) ', function() {
    it( 'should do a bunch of stuff', function( done ) {

      var mockRegistration = {
        _id: '123456789',
        notificationType: {
          _id: '987654321'
        }
      };

      var mockNotificationType = {
        _id: '987654321'
      };
      var execStub = new Stub( null, mockNotificationType );
      var mockControllers = {
        notificationType: {
          getQuery: new Stub( null, { exec: execStub }, true)
        },
        registration: {
          post : new Stub(null, null, true),
          model: {
            update: new Stub( null, 1 )
          }
        }
      };

      var mockRegistrationGateway = {
        register: new Stub( null, true )
      };

      registrationMiddleware.init(mockControllers, mockRegistrationGateway);
      registrationMiddleware.postCreate( null, mockRegistration );

      mockControllers.notificationType.getQuery.called.withArguments( { params: { id: mockNotificationType._id } });
      execStub.called.withNoArguments();
      mockRegistrationGateway.register.called.withArguments( mockRegistration, mockNotificationType );
      mockControllers.registration.model.update.called.withArguments( { _id: mockRegistration._id }, { registrationConfirmed: true } );
      done();

    } );
  } );
} );
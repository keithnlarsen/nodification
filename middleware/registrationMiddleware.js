module.exports = (function() {
  var notificationRegistrationGateway = require( '../gateways/notificationRegistrationGateway' );
  var cons;

  function afterCreate ( err, registration ) {

    cons.notificationType.getQuery( { params: { id: registration.notificationType._id } } ).exec( function( err, notificationType ) {
      notificationRegistrationGateway.register( registration, notificationType, function ( err ) {
        if ( !err ) {
          cons.registration.model.update( { _id : registration._id }, { registrationConfirmed: true }, function ( err, count ) {
            // TODO: Need to log this error somewhere?
          } );
        }
      } );
    } );
  }

  // TODO: Come up with a dependancy injection design for javascript
  function init ( controllers, gateway ) {
    notificationRegistrationGateway = gateway || notificationRegistrationGateway;
    cons = controllers;
    controllers.registration.afterHook( 'create', afterCreate );
  }

  return {
    init: init,
    afterCreate: afterCreate
  }
}());
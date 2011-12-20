module.exports = (function() {
  var app;

  function init ( nodificationApp ) {
    app = nodificationApp;
    nodificationApp.controllers.registration.afterHook( 'insert', afterInsert );
  }

  function afterInsert ( err, registration ) {
    console.log(registration.notificationType._id);
    app.models.notificationType.getModel().findById( registration.notificationType._id, function( err, notificationType ) {
      console.log("Here");

      getGateway(notificationType).register( registration, notificationType, function ( err ) {
        if ( !err ) {
          app.controllers.registration.model.update( { _id : registration._id }, { registrationConfirmed: true }, function ( err, count ) {
            // TODO: Need to log this error somewhere?
          } );
        }
      } );
    } );
  }

  function getGateway ( notificationType ) {
    if ( app.gateways.notificationRegistration[notificationType.name] ) {
      return app.gateways.notificationRegistration[notificationType.name];
    } else {
      var gateway = require('../gateways/notificationRegistrationGateway');
      gateway.init();
      app.gateways.notificationRegistration[notificationType.name] = gateway;
      return gateway;
    }
  }

  return {
    init: init,
    afterInsert: afterInsert
  }
}());
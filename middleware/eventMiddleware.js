module.exports = (function() {
  var apnGateway = require( '../gateways/apnGateway' );
  var controllers;

  // TODO: Come up with a dependancy injection design for javascript
  function init ( app, gateway ) {
    apnGateway = gateway || apnGateway;
    controllers = app.controllers;
    controllers.event.afterHook( 'create', afterCreate );
  }

  function afterCreate ( err, event ) {
    controllers.registration.model.find()
                                  .where('key', event.registrationKey)
                                  .where('notificationType', event.notificationType._id)
                                  .exec( function( err, instance ) {
      var devices = instance.devices;
      for ( var device in devices ) {
        if( devices[device].type === 'ios' ){
          apnGateway.sendNotification(event, devices[device]);
        }
      }
    });
  }

  return {
    init: init,
    afterCreate: afterCreate
  }
}());
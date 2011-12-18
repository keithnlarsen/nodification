module.exports = (function() {
//  var apnGateway = require( '../gateways/apnGateway' );
  var controllers;
  var gateways;
  var ap;

  // TODO: Come up with a dependancy injection design for javascript
  function init ( app ) {
//    var apnGateway = gateway || require( '../gateways/apnGateway' );
    // Instantiate our gateway

    // Add it to the app.gateway collection

    // reference the collection to the local closure

    //register the event hook
    ap = app;
    gateways = app.gateways;
    controllers = app.controllers;
    controllers.event.afterHook( 'create', afterCreate );
  }

  function afterCreate ( err, event ) {
    controllers.registration.model.find()
                                  .where('key', event.registrationKey)
                                  .where('notificationType', event.notificationType._id)
                                  .exec( function( err, instance ) {

      if (! ap.gateways[event.notificationType.name]) {
        ap.gateways[event.notificationType.name] = require('../gateways/apnGateway');
        ap.gateways[event.notificationType.name].init();
      }

      var devices = instance.devices;
      for ( var device in devices ) {
        if( devices[device].type === 'ios' ){
          gateways[event.notificationType.name].sendNotification(event, devices[device]);
        }
      }
    });
  }

  return {
    init: init,
    afterCreate: afterCreate
  }
}());
module.exports = (function() {
//  var apnGateway = require( '../gateways/apnGateway' );
  var app;

  // TODO: Come up with a dependancy injection design for javascript
  function init ( nodificationApp ) {
//    var apnGateway = gateway || require( '../gateways/apnGateway' );
    // Instantiate our gateway

    // Add it to the app.gateway collection

    // reference the collection to the local closure

    //register the event hook
    app = nodificationApp;
    app.controllers.event.afterHook( 'insert', afterInsert );
  }

  function afterInsert ( err, event ) {
    app.controllers.registration.model.find()
                                  .where('key', event.registrationKey)
                                  .where('notificationType', event.notificationType._id)
                                  .exec( function( err, instance ) {

      var devices = instance.devices;
      for ( var device in devices ) {
        if( devices[device].type === 'ios' ){

          if (! app.gateways.apn[event.notificationType.name]) {
            app.gateways.apn[event.notificationType.name] = require('../gateways/apnGateway');
            app.gateways.apn[event.notificationType.name].init();
          }

          app.gateways.apn[event.notificationType.name].sendNotification(event, devices[device]);
        }
      }
    });
  }

  return {
    init: init,
    afterInsert: afterInsert
  }
}());
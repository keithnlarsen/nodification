module.exports = (function () {
  var app;

  function init ( nodificationApp ) {
    app = nodificationApp;
    app.controllers.event.afterHook( 'insert', afterInsert );
  }

  function afterInsert ( err, event, callback ) {
    app.controllers.registration.model.find()
      .where( 'key', event.registrationKey )
      .where( 'notificationType', event.notificationType._id )
      .exec( function ( err, registration ) {
        app.controllers.notificationType.model.findById(event.notificationType._id).exec( function ( err, notificationType ) {
          var devices = registration[0].devices;
          var vendors = notificationType.vendors;
          var i;
          for (i = 0 ; i < devices.length; i++ ) {
            var device = devices[i];
            var specificVendor = vendors.getByField( { type: device.type });
            var gateway = getGateway(device, specificVendor);
            gateway.sendNotification( event, device );

                  if ( notificationType.length > 1 ) {
                    callback( new Error( 'More than one vendor found for NotificationType: ' + event.notificationType.name + ' and VendorType: ' + event.type ), i - 1 );
                  }
          }

          callback( null, i );
        } );
      } );
  }


  function getGateway ( device, vendor ){
    if( !app.gateways[device.type]) {
      app.gateways[device.type] = {};
    }
    if ( !app.gateways[device.type][event.notificationType.name] ) {
      app.gateways[device.type][event.notificationType.name] = require( '../gateways/' + device.type + 'Gateway' );
      app.gateways[device.type][event.notificationType.name].init( vendor );
    }

    return app.gateways[device.type][event.notificationType.name];
  }

  return {
    init: init,
    afterInsert: afterInsert
  }
}());
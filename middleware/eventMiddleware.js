module.exports = (function () {
  var app;
  var errors;

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
          if ( notificationType.length > 1 ) {
            callback( new Error( 'More than one vendor found for NotificationType: ' + event.notificationType.name + ' and VendorType: ' + event.type ), i - 1 );
          }
          var devices = registration[0].devices;
          var vendors = notificationType.vendors;
          var i;
          errors = [];
          for (i = 0 ; i < devices.length; i++ ) {
            var device = devices[i];
            var specificVendor = getVendorByField( device.type, 'type', vendors );
            var gateway = getGateway( event, device, specificVendor, callback );
            if( gateway ){
              gateway.sendNotification( event, device );
            }
          }
          callback( ( errors.length > 0 ? errors : null ), i );
        } );
      } );
  }


  function getGateway ( event, device, vendor ){
    if( !app.gateways[device.type]) {
      app.gateways[device.type] = {};
    }
    if ( !app.gateways[device.type][event.notificationType.name] ) {
      try {
        app.gateways[device.type][event.notificationType.name] = require( '../gateways/' + device.type + 'Gateway' );
        app.gateways[device.type][event.notificationType.name].init( vendor );
      } catch ( exception ) {
        errors.push(new Error( 'Invalid Gateway: ' + device.type + 'Gateway does not exist. ' + device.name + ' could not be notified.'));
      }
    }

    return app.gateways[device.type][event.notificationType.name];
  }

  function getVendorByField( item, item_id, array ) {
    var foundObj = null;
    for ( var i in array ) {
      var tmpObj = array[i];
      if( tmpObj[item_id] === item ){
        foundObj = tmpObj;
        return foundObj;
      }
    }
  }


  return {
    init: init,
    afterInsert: afterInsert
  }
}());
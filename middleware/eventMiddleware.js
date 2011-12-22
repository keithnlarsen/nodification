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
      .exec( function ( err, instance ) {
        var devices = instance[0].devices;
        var i;
        for (i = 0 ; i < devices.length; i++ ) {
          if ( devices[i].type === 'ios' ) {
            var device = devices[i];
            app.controllers.notificationType.model.findById(event.notificationType._id).exec( function ( err, instance ) {
              var vendors = instance.vendors;
              for ( var x = 0; x < vendors.length; x++ ){
                if( vendors[x].type === 'ios'){
                  if ( instance.length > 1 ) {
                    callback( new Error( 'More than one vendor found for NotificationType: ' + event.notificationType.name + ' and VendorType: ' + event.type ), i - 1 );
                  } else {
                    if ( !app.gateways.apn[event.notificationType.name] ) {
                      app.gateways.apn[event.notificationType.name] = require( '../gateways/apnGateway' );
                      app.gateways.apn[event.notificationType.name].init( vendors[x] );
                    }

                    app.gateways.apn[event.notificationType.name].sendNotification( event, device );
                  }
                }
              }
            });
          }
        }
        callback( null, i );
      } );
  }

  return {
    init: init,
    afterInsert: afterInsert
  }
}());
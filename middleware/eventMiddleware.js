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

        var devices = instance.devices;
        var i;
        for ( i in devices ) {
          if ( devices[i].type === 'ios' ) {
            app.controllers.vendor.model.find()
              .where( 'notificationType', event.notificationType._id )
              .where( 'type', event.type )
              .exec( function ( err, instance ) {
                if (instance.length > 1) {
                  callback(new Error('More than one vendor found for NotificationType: ' + event.notificationType.name + ' and VendorType: ' + event.type), i -1);
                } else {
                  if ( !app.gateways.apn[event.notificationType.name] ) {
                    app.gateways.apn[event.notificationType.name] = require( '../gateways/apnGateway' );
                    app.gateways.apn[event.notificationType.name].init( instance[0] );
                  }

                  app.gateways.apn[event.notificationType.name].sendNotification( event, devices[i] );
                }
              } );

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
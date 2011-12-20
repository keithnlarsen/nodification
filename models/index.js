module.exports = ( function() {
  var vendor = require( './vendor' );
  var notificationType = require( './notificationType' );
  var device = require( './device' );
  var registration = require( './registration' );
  var event = require( './event' );

  function init ( nodificationApp ) {
    vendor.init( nodificationApp);
    notificationType.init( nodificationApp );
    device.init( nodificationApp );
    registration.init( nodificationApp );
    event.init( nodificationApp );
  }

  return {
    vendor: vendor,
    notificationType: notificationType,
    device: device,
    registration: registration,
    event: event,

    init: init
  }
}());
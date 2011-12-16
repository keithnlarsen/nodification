module.exports = (function() {

  var apns = require( 'apn' );
  var apnsConnection;

  function init ( vendor ) {
    var url = require( 'url' ).parse( vendor.pushGatewayUrl );

    options = {
      certData: vendor.certData,
      keyData:  vendor.keyData,
      gateway: url.hostname,
      port: url.port,
      enhanced: true,
      errorCallback: undefined,
      cacheLength: 5
    };

    apnsConnection = new apns.Connection( options );
  }

  function createNotification (event, device) {
    var myDevice = new apns.Device(device.token /*, ascii=true*/);
    var notification = new apns.Notification();

    notification.badge = event.badge;
    notification.sound = "ping.aiff";
    notification.alert = event.alert;
    notification.payload = event.payload;
    notification.device = myDevice;

    return notification;
  }

  function sendNotification ( event, device ) {
    var notification = createNotification(event, device);
    apnsConnection.sendNotification( notification );
  }

  return {
    init: init,
    register: sendNotification
  };
}());
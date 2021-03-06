module.exports = (function () {

  var apns;
  var apnsConnection;

  function init ( vendor, apn ) {
    apns = apn || require( 'apn' );
    var url = require( 'url' ).parse( vendor.pushGatewayUrl );

    var options = {
      certData: vendor.certData,
      keyData: vendor.keyData,
      gateway: url.hostname,
      port: url.port,
      enhanced: true,
      errorCallback: errorCallback,
      cacheLength: vendor.cacheLength
    };

    apnsConnection = new apns.Connection( options );
  }

  function createNotification ( event, device ) {
    var myDevice = new apns.Device( device.token /*, ascii=true*/ );
    var notification = new apns.Notification();

    notification.badge = event.badge;
    notification.sound = "ping.aiff";
    notification.alert = event.alert;
    notification.payload = event.payload;
    notification.device = myDevice;

    return notification;
  }

  function sendNotification ( event, device ) {
    var notification = createNotification( event, device );
    console.log('Message sent to: ' + device);
    return apnsConnection.sendNotification( notification );
  }

  function errorCallback ( errorNumber, notification ) {
    console.log( 'Error: ' + errorNumber + ' ' + notification);
  }

  return {
    init: init,
    sendNotification: sendNotification
  };
}());
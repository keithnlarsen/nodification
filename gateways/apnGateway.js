module.exports = (function() {

  var apns = require( 'apn' );
  var apnsConnection;

  function init ( notificationType ) {
    options = { cert: 'cert.pem', /* Certificate file */
      key:  'key.pem',  /* Key file */
      gateway: 'gateway.push.apple.com', /* gateway address */
      port: 2195, /* gateway port */
      enhanced: true, /* enable enhanced format */
      errorCallback: undefined, /* Callback when error occurs */
      cacheLength: 5 /* Notifications to cache for error purposes */
    };

    apnsConnection = new apns.connection( options );
  }

  function createNotification (myDevice) {
    var notification = new apns.notification();

    notification.badge = 3;
    notification.sound = "ping.aiff";
    notification.alert = "You have a new message";
    notification.payload = {'messageFrom': 'Caroline'};
    notification.device = myDevice;
    return notification;
  }

  function sendNotification ( device ) {
    var myDevice = new apns.device(device.token /*, ascii=true*/);
    var notification = createNotification(myDevice);
    apnsConnection.sendNotification( notification );
  }

  return {
    init: init,
    register: sendNotification
  };
}());
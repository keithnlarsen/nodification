module.exports = (function() {
  var client;
  var reqHelper;
  var eventNotificationUrl = 'localhost:3000/events';

  return {

    init: function( webClient, requestHelper ) {
      client = webClient;
      reqHelper = requestHelper || require( '../libs/requestHelper' );
    },

    register: function( registration, notificationType, callBack ) {
      var url = require( 'url' ).parse( notificationType.registrationUrl );
      client = client || require( http ).createClient( url.port, url.hostname );
      var request = client.request( 'GET', url.path, {'Host': url.hostname, 'Accept': 'application/json', 'Content-Type': 'application/json'} );

      var message = {
        'registrationKey': registration.key,
        'eventNotificationUrl': eventNotificationUrl,
        'notificationType': notificationType.name
      };

      request.write( JSON.stringify(message) );

      reqHelper( request, function( response ) {
        switch ( response.statusCode ) {
          case 200:
            callBack( null, response.body );
            break;
          default:
            callBack( new Error( 'Error registering notification at:' + notificationType.registrationUrl + '.  StatusCode ' + response.statusCode + ': ' + response.body ), null );
        }
      } );
    }
  }
}());
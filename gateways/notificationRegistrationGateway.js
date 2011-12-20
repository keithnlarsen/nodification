// This is an implementation of the Revealing Module Pattern
// ref: http://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
//
// ---- Example of how to call ----
// ---- You only need to call init if you want to overide the default options ----
// var options = { client: someClient, requestHandler: someHandler, eventNotificationUrl: 'someUrl' };
// gateway.init( options );
// gateway.register( registrationData, voiceMailType, function ( err, success) { ... });
//
module.exports = (function () {
  var client;
  var requestOptions = {
    'Host': '',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  var requestHandler;
  var eventNotificationUrl = 'http://localhost:3000/events';
  var urlParser = require( 'url' );

  function init ( options ) {
    if ( options ) {
      client = options.client || null;
      requestHandler = options.requestHandler || require( '../libs/requestHandler' );
      eventNotificationUrl = options.eventNotificationUrl || eventNotificationUrl;
    }
  }

  function createRequest ( registration, notificationType ) {
    var url = urlParser.parse( notificationType.registrationUrl );
    var http = (url.protocol == 'http') ? require( 'http' ) : require( 'https' );

    requestOptions['Host'] = url.hostname;

    var requestClient = client || http.createClient( url.port, url.hostname );

    var message = {
      'registrationKey': registration.key,
      'eventNotificationUrl': eventNotificationUrl,
      'notificationType': notificationType.name
    };

    var request = requestClient.request( 'GET', url.path, requestOptions );
    request.write( JSON.stringify( message ) );
    return request;
  }

  function register ( registration, notificationType, callBack ) {
    requestHandler.handle( createRequest( registration, notificationType ), function ( err, response ) {
      if ( response.statusCode >= 200 && response.statusCode < 300 ) {
        callBack( null, true );
      } else {
        callBack( new Error( 'Error registering notification at:' + notificationType.registrationUrl + '.  StatusCode ' + response.statusCode + ': ' + response.body ), false );
      }
    } );
  }

  return {
    init: init,
    register: register
  };
}());
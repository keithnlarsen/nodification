module.exports = ( function () {

  function handle ( request, callBack ) {
    request.on( 'response', function ( response ) {
      var responseBody = "";
      response.setEncoding( 'utf8' );

      response.addListener( "data", function ( chunk ) {
        responseBody += chunk;
      } );

      response.on( 'end', function () {
        response.body = responseBody;
        callBack( null, response );
      } );
    } );

    request.end();
  }

  return {
    handle: handle
  }
}());


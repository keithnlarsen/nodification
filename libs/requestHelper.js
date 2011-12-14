module.exports = function( request, callBack ) {
  request.on( 'response', function ( response ) {
    var responseBody = "";
    response.setEncoding( 'utf8' );

    response.addListener( "data", function( chunk ) {
      responseBody += chunk;
    } );

    response.on( 'end', function() {
      response.body = responseBody;
      callBack( response );
    } );
  } );

  request.end();
};
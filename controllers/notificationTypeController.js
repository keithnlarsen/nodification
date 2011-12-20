module.exports = ( function () {
  var baseController = require( '../libs/baseRestController' );

  var notificationTypeController = baseController.extend( {

    index: function ( req, res, next ) {
      this.listQuery( req ).exec( function ( err, instance ) {
        if ( err ) {
          next( new Error( 'Internal Server Error: see logs for details: ' + err ), req, res );
        } else {
          var options = {};
          options['notificationTypes'] = instance.map( function ( instance ) {
            return instance.toObject();
          } );

          res.render( 'notificationType', options );
        }
      } );
    }

//  // An example of how to call the base class implementation.
//  list: function(fn){
//    this._super(controller, "list", [function(err, list){
//      fn(err, list);
//    }]);
//  }
  } );

  return notificationTypeController;
}());
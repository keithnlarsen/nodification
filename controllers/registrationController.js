module.exports = ( function() {
  var baseController = require('../libs/baseRestController');

  var registrationController = baseController.extend({

    getQuery: function(req) {
      return this.model.findById(req.params.id).populate('notificationType', ['name']);
    },

    listQuery: function() {
      return this.model.find({}).populate('notificationType', ['name']);
    },

    index: function ( req, res, next ) {
      this.listQuery( req ).exec( function( err, instance ) {
        if ( err ) {
          next( new Error( 'Internal Server Error: see logs for details: ' + err ), req, res );
        } else {
          var options = {};
          options['registrations'] = instance.map( function( instance ) {
            return instance.toObject();
          } );

          res.render( 'registration', options );
        }
      } );
    }


    // Example of how to call the super class from the base class
//  list: function(fn){
//    this._super(registrationController, "list", [function(err, list){
//      fn(err, list);
//    }]);
//  }
  });

  return registrationController;
}());
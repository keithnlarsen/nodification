module.exports = ( function() {

  return {
    notificationType: {},
    registration: {},

    init: function( app ) {
    },

    index: function( req, res ) {
      res.render( 'index.jade', { title: 'Express' } );
    }
  }
}());
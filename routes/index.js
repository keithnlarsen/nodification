module.exports = ( function() {
  var errors;

  return {
    contentTypeJson: function( req, res, next ) {
      if ( req.headers['content-type'].indexOf( 'json' ) > -1 ) {
        next();
      } else {
        console.log(req.headers);
        next( errors.unsupportedMediaType.create( 'Unsupported content-type: ' + req.headers['content-type'] ) );
      }
    },

    init: function( app ) {
      errors = app.restErrors;

      app.get( '/', function( req, res ) {
        res.render( 'index.html', { title: 'Express' } );
      } );

      app.get( '/notificationTypes', function ( req, res, next ) {
        if ( req.accepts( 'json' ) ) {
          app.controllers.notificationType.list( req, res, next );
        } else {
          app.controllers.notificationType.index( req, res, next );
        }
      } );

      app.put( '/notificationTypes', this.contentTypeJson, function ( req, res, next ) {
        app.controllers.notificationType.insert( req, res, next );
      } );

      app.get( '/notificationTypes/:id', function ( req, res, next ) {
        app.controllers.notificationType.get( req, res, next );
      } );

      app.post( '/notificationTypes/:id', function ( req, res, next ) {
        app.controllers.notificationType.update( req, res, next );
      } );

      app.del( '/notificationTypes/:id', function ( req, res, next ) {
        app.controllers.notificationType.remove( req, res, next );
      } );

      app.get( '/registrations', function ( req, res, next ) {
        if ( req.accepts( 'json' ) ) {
          app.controllers.registration.list( req, res, next );
        } else {
          app.controllers.registration.index( req, res, next );
        }
      } );

      app.put( '/registrations', function ( req, res, next ) {
        app.controllers.registration.insert( req, res, next );
      } );

      app.get( '/registrations/:id', function ( req, res, next ) {
        app.controllers.registration.get( req, res, next );
      } );

      app.post( '/registrations/:id', function ( req, res, next ) {
        app.controllers.registration.update( req, res, next );
      } );

      app.del( '/registrations/:id', function ( req, res, next ) {
        app.controllers.registration.remove( req, res, next );
      } );

      // TODO: the following routes
      // [get, put]          /registrations/:id/devices
      // [get, post, delete] /registrations/:id/devices/:id
      // [get, put]          /events
      // [get, post, delete] /events/:id
      // [get]               /events/notificationType=:typeid

    }
  }
}());
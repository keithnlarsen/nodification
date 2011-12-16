var baseObject = require( './baseobject' );
//var inflection = require( './inflection.js' );

var baseRestController = baseObject.extend( {
  name: '',
  model: null,
  restErrors: null,
  preQueue: {},
  postQueue: {},

  _construct: function( model, restErrors ) {
    this.model = model;
    this.restErrors = restErrors;
    this.name = model.modelName;
  },

  pre: function( method, callback ){
    this.preQueue[method] = callback;
  },

  post: function( method, callback ){
    this.postQueue[method] = callback;
  },

  listQuery: function( req ) {
    return this.model.find( {} );
  },

  getQuery: function( req ) {
    return this.model.findById( req.params.id );
  },

  list: function( req, res, next ) {
    this.listQuery( req ).exec( function( err, instance ) {
      if ( err ) {
        next( new Error( 'Internal Server Error: see logs for details: ' + err ), req, res );
      } else {
        if ( instance.length == 0 ) {
          res.send( instance, 204 );
        } else {
          res.send( instance.map( function( instance ) {
            return instance.toObject();
          } ) );
        }
      }
    } );
  },

  get: function( req, res, next ) {
    var self = this;
    this.getQuery( req ).exec( function( err, instance ) {
      if ( err ) {
        next( new Error( 'Internal Server Error: see logs for details: ' + err ), req, res );
      } else if ( !instance ) {
        next( self.restErrors.notFound.create( self.name + ' Id: "' + req.params.id + '" was not found.' ), req, res );
      } else {
        res.send( instance.toObject() );
      }
    } );
  },

  update: function( req, res, next ) {
    var self = this;
    this.model.update( { _id:req.params.id}, req.body, function( err, count ) {
      if ( err ) {
        next( new Error( 'Internal Server Error: see logs for details: ' + err ), req, res );
      } else if ( count === 0 ) {
        next( self.restErrors.notFound.create( self.name + ' Id: "' + req.params.id + '" was not found.' ), req, res );
      } else {
        self.getQuery( req ).exec( function( err, instance ) {
          if ( err ) {
            if (self.postQueue.update){
              self.postQueue.update(new Error( 'Internal Server Error: see logs for details: ' + err ), instance);
            }
            next( new Error( 'Internal Server Error: see logs for details: ' + err ), req, res );
          } else if ( !instance ) {
            if (self.postQueue.update){
              self.postQueue.update(self.restErrors.notFound.create( self.name + ' Id: "' + req.params.id + '" was not found.' ), instance);
            }
            next( self.restErrors.notFound.create( self.name + ' Id: "' + req.params.id + '" was not found.' ), req, res );
          } else {
            if (self.postQueue.update){
              self.postQueue.update(null, instance);
            }
            res.send( instance.toObject() );
          }
        } );
      }
    } );
  },

  insert: function( req, res, next ) {
    var self = this;
    this.model.create( req.body, function( err, instance ) {
      if ( err ) {
        if ( err.message.search( /duplicate key error/ ) ) {
          next( self.restErrors.conflict.create( err.message ), req, res );
        } else {
          next( new Error( 'Internal Server Error: see logs for details: ' + err ), req, res );
        }
      } else {
        req.params = req.params || {};
        req.params.id = instance._id;
        self.getQuery( req ).exec( function( err, instance ) {
          if ( err ) {
            if (self.postQueue.insert){
              self.postQueue.insert(new Error( 'Internal Server Error: see logs for details: ' + err ), instance);
            }
            next( new Error( 'Internal Server Error: see logs for details: ' + err ), req, res );
          } else if ( !instance ) {
            if (self.postQueue.insert){
              self.postQueue.insert(self.restErrors.notFound.create( self.name + ' Id: "' + req.params.id + '" was not found.' ), instance);
            }
            next( self.restErrors.notFound.create( self.name + ' Id: "' + req.params.id + '" was not found.' ), req, res );
          } else {
            if (self.postQueue.insert){
              self.postQueue.insert(null, instance);
            }
            res.send( instance.toObject(), 201 );
          }
        } );
      }
    } );
  },

  remove: function( req, res, next ) {
    var self = this;
    var removedItem;
    this.getQuery( req ).exec( function( err, instance ) {
      if ( err ) {
        next( new Error( 'Internal Server Error: see logs for details: ' + err ), req, res );
      } else if ( !instance ) {
        next( self.restErrors.notFound.create( self.name + ' Id: "' + req.params.id + '" was not found.' ), req, res );
      } else {
        removedItem = instance;
        if( self.preQueue.remove ) {
          self.preQueue.remove( instance, function(err){
            if (err) {
              next( new Error( 'Internal Server Error: see logs for details: ' + err ), req, res );
            } else {
              remove();
            }
          });
        } else {
          remove();
        }
      }
    } );
    function remove() {
      self.model.remove( {_id:req.params.id}, function( err, count ) {
        if ( err ) {
          if (self.postQueue.remove){
            self.postQueue.remove(new Error( 'Internal Server Error: see logs for details: ' + err ));
          }
          next( new Error( 'Internal Server Error: see logs for details: ' + err ), req, res );
        } else if ( count === 0 ) {
          if (self.postQueue.remove){
            self.postQueue.remove(self.restErrors.notFound.create( self.name + ' Id: "' + req.params.id + '" was not found.' ));
          }
          next( self.restErrors.notFound.create( self.name + ' Id: "' + req.params.id + '" was not found.' ), req, res );
        } else {
          if (self.postQueue.remove){
            self.postQueue.remove(null, removedItem);
          }
          res.send( {} );
        }
      } );
    }
  }
} );

module.exports = baseRestController;
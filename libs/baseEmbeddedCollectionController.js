var baseObject = require( './baseobject' );
//var inflection = require( './inflection.js' );

var baseController = baseObject.extend( {
  name: '',
  model: null,
  embeddedFieldName: null,
  restErrors: null,

  _construct: function ( model, embeddedFieldName, restErrors ) {
    this.model = model;
    this.embeddedFieldName = embeddedFieldName;
    this.restErrors = restErrors;
    this.name = model.modelName;
  },

  getQuery: function ( req ) {
    return this.model.findById( req.params.id );
  },

  list: function ( req, res, next ) {
    var self = this;
    this.getQuery( req ).exec( function ( err, instance ) {
      if ( err ) {
        next( new Error( 'Internal Server Error: see logs for details: ' + err ), req, res );
      } else {
        if ( instance.length == 0 ) {
          res.send( instance, 204 );
        } else {
          res.send( instance[self.embeddedFieldName].map( function ( instance ) {
            return instance.toObject();
          } ) );
        }
      }
    } );
  },

  get: function ( req, res, next ) {
    var self = this;
    this.getQuery( req ).exec( function ( err, instance ) {
      if ( err ) {
        next( new Error( 'Internal Server Error: see logs for details: ' + err ), req, res );
      } else if ( !instance ) {
        next( self.restErrors.notFound.create( self.name + ' Id: "' + req.params.id + '" was not found.' ), req, res );
      } else {
        var result = instance[self.embeddedFieldName].id( req.params.eid );
        if ( result ) {
          res.send( result.toObject() );
        } else {
          next( self.restErrors.notFound.create( self.embeddedFieldName + ': "' + req.params.eid + '" was not found.' ), req, res );
        }
      }
    } );
  },

  update: function ( req, res, next ) {
    var self = this;
    this.getQuery( req ).exec( function ( err, instance ) {
      if ( err ) {
        next( new Error( 'Internal Server Error: see logs for details: ' + err ), req, res );
      } else if ( !instance ) {
        next( self.restErrors.notFound.create( self.name + ' Id: "' + req.params.id + '" was not found.' ), req, res );
      } else {
        var toUpdate = instance[self.embeddedFieldName].id( req.params.eid );
        for ( var name in req.body ) {
          toUpdate[name] = req.body[name];
        }
        instance.save( function ( err, updated ) {
          if ( err ) {
            next( new Error( 'Internal Server Error: see logs for details: ' + err ), req, res );
          } else {
            var result = updated[self.embeddedFieldName].id( req.params.eid );
            if ( result ) {
              res.send( result.toObject() );
            } else {
              next( self.restErrors.notFound.create( self.embeddedFieldName + ': "' + req.params.eid + '" was not found.' ), req, res );
            }
          }
        } );
      }
    } );
  },

  insert: function ( req, res, next ) {
    var self = this;
    this.getQuery( req ).exec( function ( err, instance ) {
      if ( err ) {
        next( new Error( 'Internal Server Error: see logs for details: ' + err ), req, res );
      } else if ( !instance ) {
        next( self.restErrors.notFound.create( self.name + ' Id: "' + req.params.id + '" was not found.' ), req, res );
      } else {
        instance[self.embeddedFieldName].push( req.body );
        instance.save( function ( err, instance ) {
          if ( err ) {
            next( new Error( 'Internal Server Error: see logs for details: ' + err ), req, res );
          } else {
            var embedded = instance[self.embeddedFieldName];
            for ( var i = 0; i < embedded.length; i++ ) {
              var doc = embedded[i];
              var found = true;
              for ( var name in req.body ) {
                if ( doc[name] != req.body[name] ) {
                  found = false;
                }
              }
              if ( found ) {
                res.send( doc, 201 );
                break;
              }
            }
            if ( !found ) {
              next( new Error( 'Internal Server Error: see logs for details: ' + err ), req, res );
            }
          }
        } );
      }
    } );
  },

  remove: function ( req, res, next ) {
    var self = this;
    this.getQuery( req ).exec( function ( err, instance ) {
      if ( err ) {
        next( new Error( 'Internal Server Error: see logs for details: ' + err ), req, res );
      } else if ( !instance ) {
        next( self.restErrors.notFound.create( self.name + ' Id: "' + req.params.id + '" was not found.' ), req, res );
      } else {
        instance[self.embeddedFieldName].id( req.params.eid ).remove();
        instance.save( function ( err ) {
          if ( err ) {
            next( new Error( 'Internal Server Error: see logs for details: ' + err ), req, res );
          } else {
            res.send( {} );
          }
        } );
      }
    } );
  }
} );

module.exports = baseController;
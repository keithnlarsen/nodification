var baseObject = require( './baseobject' );

var baseModel = baseObject.extend( {
  name: "",
  schema: {},
  model: {},

  _construct: function( mongoose ) {
    mongoose.model( this.name, this.schema );
    this.model = mongoose.model( this.name );
  }
} );

module.exports = baseModel;
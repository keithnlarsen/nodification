module.exports = ( function() {
  var baseModel = require( '../libs/basemodel' );
  var Schema = require( 'mongoose' ).Schema;

  return baseModel.extend( {
    name: "NotificationType",
    model: {},
    schema: new Schema( {
      name: { type: String, index : { unique : true }},
      registrationUrl: { type: String, required : true },
      userName: String,
      password: String
    } )
  } );
}());

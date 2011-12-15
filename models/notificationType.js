module.exports = ( function() {
  var baseModel = require( '../libs/basemodel' );
  var Schema = require( 'mongoose' ).Schema;

  var vendor = baseModel.extend( {
    name: 'Vendor',
    model: {},
    schema: new Schema( {
      type: { type: String, enum: ['android', 'ios'] },
      name: String,
      token: String
    } )
  } );

  return baseModel.extend( {
    name: "NotificationType",
    model: {},
    schema: new Schema( {
      name: { type: String, index : { unique : true }},
      registrationUrl: { type: String, required : true },
      userName: String,
      password: String,
      vendors: [vendor.model]
    } )
  } );
}());

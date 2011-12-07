module.exports = ( function() {
  var baseModel = require( '../libs/basemodel' );
  var Schema = require( 'mongoose' ).Schema;

  var device = baseModel.extend( {
    name: 'Device',
    model: {},
    schema: new Schema( {
      type: { type: String, enum: ['android', 'ios'] },
      name: String,
      token: String
    } )
  } );

  return baseModel.extend( {
    name: 'Registration',
    model: {},
    schema: new Schema( {
      notificationType: {type: Schema.ObjectId, ref: 'NotificationType' },
      key: String,
      registrationConfirmed: {type: Boolean, 'default': false },
      devices: [device.schema]
    } )
  } );
}());
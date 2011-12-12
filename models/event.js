module.exports = ( function() {
  var baseModel = require( '../libs/basemodel' );
  var Schema = require( 'mongoose' ).Schema;

  return baseModel.extend( {
    name: 'Event',
    model: {},
    schema: new Schema( {
      notificationType: {type: Schema.ObjectId, ref: 'NotificationType' },
      key: String,
      receivedDate: {type: Date, 'default': new Date()},
      deliveryConfirmed: {type: Boolean, 'default': false },
      deliveryDate: Date,
      count: Number,
      meta: Schema.Types.Mixed
    } )
  } );
}());
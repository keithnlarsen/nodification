module.exports = ( function () {
  var app;

  var name = 'Event';
  var model;
  var schema;

  function init ( nodificationApp ) {
    app = nodificationApp;
    var Schema = app.mongoose.Schema;

    schema = new Schema( {
      notificationType: {type: Schema.ObjectId, ref: 'NotificationType' },
      registrationKey: String,
      receivedDate: {type: Date, 'default': new Date()},
      deliveryConfirmed: {type: Boolean, 'default': false },
      deliveryDate: Date,
      badge: Number,
      alert: String,
      payload: Schema.Types.Mixed
    } );

    model = app.mongoose.model( name, schema );
  }

  return {
    getName: function () {
      return name;
    },
    getModel: function () {
      return model;
    },
    getSchema: function () {
      return schema;
    },
    init: init
  }
}());
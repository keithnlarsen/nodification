module.exports = ( function () {
  var app;

  var name = 'Registration';
  var model;
  var schema;

  function init ( nodificationApp ) {
    app = nodificationApp;
    var Schema = app.mongoose.Schema;

    schema = new Schema( {
      notificationType: {type: Schema.ObjectId, ref: 'NotificationType' },
      key: String,
      registrationConfirmed: {type: Boolean, 'default': false },
      devices: [app.models.device.getSchema()]
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
module.exports = ( function () {
  var app;

  var name = "NotificationType";
  var model;
  var schema;

  function init ( nodificationApp ) {
    app = nodificationApp;
    var Schema = app.mongoose.Schema;

    schema = new Schema( {
      name: { type: String, index: { unique: true }},
      registrationUrl: { type: String, required: true },
      userName: String,
      password: String,
      vendors: [app.models.vendor.getSchema()]
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

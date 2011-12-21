module.exports = ( function () {
  var app;

  var name = 'Device';
  var model;
  var schema;

  function init ( nodificationApp ) {
    app = nodificationApp;
    var Schema = app.mongoose.Schema;

    schema = new Schema( {
      type: { type: String, enum: ['android', 'ios'] },
      name: String,
      token: String
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
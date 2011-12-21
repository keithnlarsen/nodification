module.exports = ( function () {
  var app;

  var name = 'Vendor';
  var model;
  var schema;

  function init ( nodificationApp ) {
    app = nodificationApp;
    var Schema = app.mongoose.Schema;

    schema = new Schema( {
      type: { type: String, enum: ['android', 'ios'] },
      name: String,
      keyData: String,
      certData: String,
      pushGatewayUrl: String,
      feedbackGatewayUrl: String,
      cacheLength: Number
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

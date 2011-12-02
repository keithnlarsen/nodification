var baseObject = require('./baseobject');

var baseModel = baseObject.extend({
  name: "",
  fields: {},
  model: {},

  _construct: function(mongoose) {
    var schema = mongoose.Schema;
    mongoose.model(this.name, new schema(this.fields));
    this.model = mongoose.model(this.name);
  }
});

module.exports = baseModel;
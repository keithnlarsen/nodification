var baseObject = require('./baseobject');

module.exports = baseObject.extend({
  name: "",
  fields: {},
  model: {},

  _construct: function(mongoose) {
    var schema = mongoose.Schema;
    mongoose.model(this.name, new schema(this.fields));
    this.model = mongoose.model(this.name);
  }
});

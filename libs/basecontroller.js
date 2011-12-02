var baseObject = require('./baseobject');

var baseController = baseObject.extend({
  model : null,
  name: 'controller',
  plural: 'controllers',

  _construct: function(model) {
    this.model = model;
  },

  get : function(id, fn) {
    this.model.findById(id, function(err, instance) {
      fn(err, instance);
    });
  },

  getByName : function(name, callBack) {
    this.model.findOne({name:name}, function(err, instance) {
      callBack(err, instance);
    });
  },

  list : function(fn) {
    this.model.find({}, function (err, list) {
      fn(err, list);
    });
  },

  update : function(id, json, fn) {
    var self = this;

    try {
      this.model.update({_id:id}, json, function(err) {
        if (err) {
          // TODO: Swallowing this error is bad, but this seems to be thrown when mongo can't find the document we are looking for.
          if (err == 'Error: Element extends past end of object')
            fn(null, null);
          else
            fn(err, null);
        }
        else {
          self.model.findById(id, function(err, instance) {
            fn(err, instance);
          });
        }
      });
    }
    catch(err) {
      fn(err, null);
    }
  },

  insert : function(json, fn) {
    this.model.create(json, function(err, instance) {
      fn(err, instance);
    });
  },

  remove : function(id, fn) {
    this.model.findById(id, function(err, instance) {
      if (instance) {
        instance.remove(function(err) {
          fn(err, instance)
        });
      }
      else {
        fn(err, instance);
      }
    });
  }
});

module.exports = baseController;
module.exports = ( function() {
  var baseController = require('../libs/baseRestController');

  var registrationController = baseController.extend({
    getQuery: function(req) {
      return this.model.findById(req.params.id).populate('notificationType', ['name']);
    },

    listQuery: function() {
      return this.model.find({}).populate('notificationType', ['name']);
    }

    // Example of how to call the super class from the base class
//  list: function(fn){
//    this._super(registrationController, "list", [function(err, list){
//      fn(err, list);
//    }]);
//  }
  });

  return registrationController;
}());
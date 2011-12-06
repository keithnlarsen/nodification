module.exports = ( function() {
  var baseController = require('../libs/basecontroller');

  var registrationController = baseController.extend({
    name: 'registration',
    plural: 'registrations',

    get : function(id, fn) {
      this.model.findById(id).populate('notificationType', ['name']).run(function(err, instance) {
        fn(err, instance);
      });
    },

    list : function(fn) {
      this.model.find({}).populate('notificationType', ['name']).run(function (err, list) {
        fn(err, list);
      });
    }

//  list: function(fn){
//    this._super(controller, "list", [function(err, list){
//      fn(err, list);
//    }]);
//  }
  });

  return registrationController;
}());
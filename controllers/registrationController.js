var baseController = require('../libs/basecontroller');

var registrationController = baseController.extend({
  name: 'registration',
  plural: 'registrations'

//  // An example of how to call the base class implementation.
//  list: function(fn){
//    this._super(controller, "list", [function(err, list){
//      fn(err, list);
//    }]);
//  }
});

module.exports = registrationController;

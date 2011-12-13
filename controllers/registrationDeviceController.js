module.exports = ( function() {
  var baseController = require('../libs/baseEmbeddedCollectionController');

  var registrationDeviceController = baseController.extend({

    // Example of how to call the super class from the base class
//  list: function(fn){
//    this._super(registrationController, "list", [function(err, list){
//      fn(err, list);
//    }]);
//  }
  });

  return registrationDeviceController;
}());
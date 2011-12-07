module.exports = ( function() {
  var baseController = require('../libs/baseRestController');

  var notificationTypeController = baseController.extend({

//  // An example of how to call the base class implementation.
//  list: function(fn){
//    this._super(controller, "list", [function(err, list){
//      fn(err, list);
//    }]);
//  }
  });

  return notificationTypeController;  
}());
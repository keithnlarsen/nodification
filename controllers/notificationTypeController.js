module.exports = ( function() {
  var baseController = require('../libs/basecontroller');

  var notificationTypeController = baseController.extend({
    name: 'notificationType',
    plural: 'notificationTypes'

//  // An example of how to call the base class implementation.
//  list: function(fn){
//    this._super(controller, "list", [function(err, list){
//      fn(err, list);
//    }]);
//  }
  });

  return notificationTypeController;  
}());
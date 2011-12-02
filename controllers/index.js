module.exports = function(){
  var notificationTypeController = require('./notificationTypeController.js');

  return {
    notificationType: {},

    init: function(models){
      this.notificationType = notificationTypeController.create(models.notificationType.model);
    }
  }
}();
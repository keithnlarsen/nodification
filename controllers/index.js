module.exports = (function(){
  var notificationTypeController = require('./notificationTypeController.js');
  var registrationController = require('./registrationController.js');

  return {
    notificationType: {},
    registration: {},

    init: function(models, restErrors){
      this.notificationType = notificationTypeController.create(models.notificationType.model, restErrors);
      this.registration = registrationController.create(models.registration.model, restErrors);
    }
  }
}());
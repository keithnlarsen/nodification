module.exports = (function(){
  var notificationTypeController = require('./notificationTypeController.js');
  var registrationController = require('./registrationController.js');
  var registrationDeviceController = require('./registrationDeviceController.js');

  return {
    notificationType: {},
    registration: {},
    registrationDevice: {},

    init: function(models, restErrors){
      this.notificationType = notificationTypeController.create(models.notificationType.model, restErrors);
      this.registration = registrationController.create(models.registration.model, restErrors);
      this.registrationDevice = registrationDeviceController.create(models.registration.model, 'devices', restErrors);
    }
  }
}());
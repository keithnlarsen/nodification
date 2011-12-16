module.exports = (function(){
  var notificationTypeController = require('./notificationTypeController.js');
  var notificationTypeVendorController = require('./notificationTypeVendorController.js');
  var registrationController = require('./registrationController.js');
  var registrationDeviceController = require('./registrationDeviceController.js');
  var eventController = require('./eventController');

  return {
    notificationType: {},
    notificationTypeVendor: {},
    registration: {},
    registrationDevice: {},
    event: {},

    init: function(models, restErrors){
      this.notificationType = notificationTypeController.create(models.notificationType.model, restErrors);
      this.notificationTypeVendor = notificationTypeVendorController.create(models.notificationType.model, 'vendors', restErrors);
      this.registration = registrationController.create(models.registration.model, restErrors);
      this.registrationDevice = registrationDeviceController.create(models.registration.model, 'devices', restErrors);
      this.event = eventController.create(models.event.model);
    }
  }
}());
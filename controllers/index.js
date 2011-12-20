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
      this.notificationType = notificationTypeController.create(models.notificationType.getModel(), restErrors);
      this.notificationTypeVendor = notificationTypeVendorController.create(models.notificationType.getModel(), 'vendors', restErrors);
      this.registration = registrationController.create(models.registration.getModel(), restErrors);
      this.registrationDevice = registrationDeviceController.create(models.registration.getModel(), 'devices', restErrors);
      this.event = eventController.create(models.event.getModel());
    }
  }
}());
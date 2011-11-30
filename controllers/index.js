module.exports = {
  NotificationTypeController: {},

  init: function(models){
    this.NotificationTypeController = require('./notificationTypeController.js').create(models.NotificationType.model);
  }
};
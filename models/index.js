module.exports = {
  NotificationType: {},

  init: function(mongoose){
    this.NotificationType = require('./notificationType.js').create(mongoose);
  }
};
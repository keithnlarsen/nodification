module.exports = function(){
  var notificationTypeModel = require('./notificationType.js');

  return {
    notificationType: {},

    init: function(mongoose){
      this.notificationType = notificationTypeModel.create(mongoose);
    }
  }
}();
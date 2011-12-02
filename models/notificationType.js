var baseModel = require('../libs/basemodel');

var notificationType = baseModel.extend({
  name: "NotificationType",
  fields: {
    name: { type: String, index : { unique : true }},
    registrationUrl: { type: String, required : true },
    userName: String,
    password: String
  }
});

module.exports = notificationType;
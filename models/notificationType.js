var baseModel = require('../libs/basemodel');

module.exports = baseModel.extend({
  name: "NotificationType",
  fields: {
    name: { type: String, index : { unique : true }},
    registrationUrl: { type: String, required : true },
    userName: String,
    password: String
  }
});
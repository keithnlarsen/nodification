var baseModel = require('../libs/basemodel');
var Schema = require('mongoose').Schema;

var notificationType = baseModel.extend({
  name: "NotificationType",
  schema: new Schema({
    name: { type: String, index : { unique : true }},
    registrationUrl: { type: String, required : true },
    userName: String,
    password: String
  })
});

module.exports = notificationType;
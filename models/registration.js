module.exports = function(notificationType){
  var baseModel = require('../libs/basemodel');
  var Schema = require('mongoose').Schema;

  var device = baseModel.extend({
    name: "Device",
    schema: new Schema({
      type: { type: String, enum: ["android", "ios"] },
      name: String,
      token: String
    })
  });

  var registration = baseModel.extend({
    name: "Registration",
    schema: new Schema({
      notificationType: Schema.ObjectId,
      notificationKey: String,
      devices: [device.schema]
    })
  });
  
  return registration;
};



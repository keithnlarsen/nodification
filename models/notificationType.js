module.exports.NotificationType = function (mongoose) {
  var schema = mongoose.Schema;

  mongoose.model('NotificationType', new schema({
    name: { type: String, index : { unique : true }},
    registrationUrl: { type: String, required : true },
    userName: String,
    password: String
  }));
    
  return mongoose.model('NotificationType');
};
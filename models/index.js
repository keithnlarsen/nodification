module.exports = ( function() {
  var notificationTypeModel = require( './notificationType.js' );
  var registrationModel = require( './registration.js' );

  return {
    notificationType: {},
    registration: {},

    init: function( mongoose ) {
      this.notificationType = notificationTypeModel.create( mongoose );
      this.registration = registrationModel.create( mongoose );

      return this;
    }
  }
}());
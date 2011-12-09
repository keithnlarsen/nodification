module.exports = ( function() {
  var notificationTypeModel = require( './notificationType.js' );
  var registrationModel = require( './registration.js' );
  var eventModel = require( './event.js' );

  return {
    notificationType: {},
    registration: {},
    event: {},

    init: function( mongoose ) {
      this.notificationType = notificationTypeModel.create( mongoose );
      this.registration = registrationModel.create( mongoose );
      this.event = eventModel.create( mongoose );

      return this;
    }
  }
}());
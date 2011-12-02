module.exports = function() {
  var notificationTypeRoutes = require('./notificationType');
  var registrationRoutes = require('./registration');

  return {
    notificationType: {},
    registration: {},

    init: function(app) {
      this.notificationType = notificationTypeRoutes.create(app.controllers, app.restErrors);
      this.registration = registrationRoutes.create(app.controllers, app.restErrors);
    },

    index: function(req, res) {
      res.render('index.jade', { title: 'Express' });
    }
  }
}();
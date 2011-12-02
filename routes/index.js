module.exports = function() {
  var notificationTypeRoutes = require('./notificationType');

  return {
    notificationType: {},

    init: function(app) {
      this.notificationType = notificationTypeRoutes.create(app.controllers, app.restErrors);
    },

    index: function(req, res) {
      res.render('index.jade', { title: 'Express' });
    }
  }
}();
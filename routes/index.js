module.exports = function() {
  var app;
  var notificationRoute = require('./notificationType');

  return {
    notificationType: {},

    init: function(expressApp) {
      app = expressApp;

      this.notificationType = notificationRoute(app);
    },

    index: function(req, res) {
      res.render('index.jade', { title: 'Express' });
    }
  }
}();
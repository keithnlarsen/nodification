module.exports = ( function() {
  var baseRoute = require('../libs/baseroute');

  var registrationRoute = baseRoute.extend({
    name: 'registration',

    new: function(req, res, next) {
      var self = this;
      this.controllers.notificationType.list(function(err, instance) {
        if (err)
          next(new Error('Internal Server Error: see logs for details: ' + err), req, res);
        else if (!instance.length > 0)
          next(self.restErrors.badRequest.create('You must first create some notification types, before registering any notifications'), req, res);
        else {
          var options = {};
          options[self.controllers.notificationType.plural] = instance.map(function(instance) {
            return instance.toObject();
          });

          res.render(self.controller.name + '/new', options);
        }
      });
    }
  });


  return registrationRoute;
}());

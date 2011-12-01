//var baseRoute = require('../libs/baseroute');
//
//var route = baseRoute.extend({
////  // An example of how to call the base class implementation.
////  list: function(fn){
////    this._super(controller, "list", [function(err, list){
////      fn(err, list);
////    }]);
////  }
//});
//
//module.exports = route;


module.exports = function(app) {
  return {
    index: function(req, res, next) {
      app.controllers.NotificationTypeController.list(function(err, instance) {
        if (err)
          next(new Error('Internal Server Error: see logs for details: ' + err), req, res);
        else if (instance.length == 0) {
          res.send(instance, 204);
        }
        else {
          if (req.params.format && req.params.format.toLowerCase() == 'json') {
            res.send(instance.map(function(instance) {
              return instance.toObject();
            }));
          }
          else{
            var options = {
              notificationTypes: instance.map(function(instance) {
                return instance.toObject();
              })
            };

            res.render('notificationType', options);
          }
        }
      });
    },

    show: function(req, res, next) {
      console.log(req.params);
      app.controllers.NotificationTypeController.get(req.params.id, function(err, instance) {
        if (err)
          next(new Error('Internal Server Error: see logs for details: ' + err), req, res);
        else if (!instance)
          next(app.RestError.NotFound.create('NotificationType Id: "' + req.params.id + '" was not found.'), req, res);
        else {
          if (req.params.format) {
            if (req.params.format.toLowerCase() == 'json') {
              res.send(instance.toObject());
            }
            else {
              next(app.RestError.BadRequest.create('The \'' + req.params.format + '\' format is not supported at this time.'), req, res);
            }
          }
          else {
            var options = {
              notificationType: instance.toObject()
            };
            res.render('notificationType' + '/show', options);
          }
        }
      });
    }
  }
};
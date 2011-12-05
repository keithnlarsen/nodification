var baseObject = require('./baseobject');

var baseRoute = baseObject.extend({
  name: '',
  controllers: null,
  controller: null,
  restErrors: null,

  _construct: function(controllers, restErrors) {
    this.controllers = controllers;
    this.controller = controllers[this.name];
    this.restErrors = restErrors;
  },

  index: function(req, res, next) {
    var self = this;
    this.controller.list(function(err, instance) {
      if (err)
        next(new Error('Internal Server Error: see logs for details: ' + err), req, res);
      else {
        if (req.params.format && req.params.format == '.json') {
          if (instance.length == 0) {
            res.send(instance, 204);
          }
          else {
            res.send(instance.map(function(instance) {
              return instance.toObject();
            }));
          }
        }

        var options = {};
        options[self.controller.plural] = instance.map(function(instance) {
          return instance.toObject();
        });

        res.render(self.controller.name, options);
      }
    });
  },

  show: function(req, res, next) {
    var self = this;
    this.controller.get(req.params.id, function(err, instance) {
      if (err)
        next(new Error('Internal Server Error: see logs for details: ' + err), req, res);
      else if (!instance)
        next(self.restErrors.notFound.create(self.controller.name + ' Id: "' + req.params.id + '" was not found.'), req, res);
      else {
        if (req.params.format) {
          if (req.params.format.toLowerCase() == '.json') {
            res.send(instance.toObject());
          }
          else {
            next(self.restErrors.badRequest.create('The \'' + req.params.format + '\' format is not supported at this time.'), req, res);
          }
        }
        else {
          var options = {};
          options[self.controller.name] = instance.toObject();
          res.render(self.controller.name + '/show', options);
        }
      }
    });
  },

  edit: function(req, res, next) {
    var self = this;
    this.controller.get(req.params.id, function(err, instance) {
      if (err)
        next(new Error('Internal Server Error: see logs for details: ' + err), req, res);
      else if (!instance)
        next(self.restErrors.notFound.create(self.controller.name + ' Id: "' + req.params.id + '" was not found.'), req, res);
      else {
        var options = {};
        options[self.controller.name] = instance.toObject();
        res.render(self.controller.name + '/edit', options);
      }
    });
  },

  new: function(req, res, next) {
    res.render(this.controller.name + '/new');
  },

  update: function(req, res, next) {
    var self = this;
    this.controller.update(req.params.id, req.body, function(err, instance) {
      if (err)
        next(new Error('Internal Server Error: see logs for details: ' + err), req, res);
      else if (!instance)
        next(self.restErrors.notFound.create(self.controller.name + ' Id: "' + req.params.id + '" was not found.'), req, res);
      else {
        if (req.params.format) {
          if (req.params.format.toLowerCase() == '.json') {
            res.send(instance.toObject());
          }
          else {
            next(self.restErrors.badRequest.create('The \'' + req.params.format + '\' format is not supported at this time.'), req, res);
          }
        }
        else {
          res.redirect('/' + self.controller.plural + '/' + instance._id);
        }
      }
    });
  },

  add: function(req, res, next) {
    var self = this;
    this.controller.insert(req.body, function(err, instance) {
      if (err)
        next(new Error('Internal Server Error: see logs for details: ' + err), req, res);
      else {
        if (req.params.format) {
          if (req.params.format.toLowerCase() == '.json') {
            res.send(instance.toObject());
          }
          else {
            next(self.restErrors.badRequest.create('The \'' + req.params.format + '\' format is not supported at this time.'), req, res);
          }
        }
        else {
          res.redirect('/' + self.controller.plural + '/' + instance._id);
        }
      }
    });
  },

  remove: function(req, res, next) {
    var self = this;
    this.controller.remove(req.params.id, function(err, instance) {
      if (err)
        next(new Error('Internal Server Error: see logs for details: ' + err), req, res);
      else if (!instance)
        next(self.restErrors.notFound.create(self.controller.name + ' Id: "' + req.params.id + '" was not found.'), req, res);
      else {
        res.redirect("/" + self.controller.plural);
      }
    });
  }
});

module.exports = baseRoute;
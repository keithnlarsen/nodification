var baseObject = require('./baseobject');

module.exports = baseObject.extend({
  cont : null,

  _construct: function(controller) {
    this.cont = controller;
  },

  index: function(req, res, next) {
    this.cont.list(function(err, instance) {
      if (err)
        next(new Error('Internal Server Error: see logs for details: ' + err), req, res);
      else if (instance.length == 0) {
        res.send(instance, 204);
      }
      else {
        if (req.params.format && req.params.format == '.json') {
          res.send(instance.map(function(instance) {
            return instance.toObject();
          }));
        }

        var options = {};
        options[this.cont.plural] = instance.map(function(instance) {
            return instance.toObject();
        });

        res.render(this.cont.name, options);
      }
    });
  },

  show: function(req, res, next) {
    this.cont.get(req.params.id, function(err, instance) {
      if (err)
        next(new Error('Internal Server Error: see logs for details: ' + err), req, res);
      else if (!instance)
        next(app.RestError.NotFound.create(this.cont.name + ' Id: "' + req.params.id + '" was not found.'), req, res);
      else {
        if (req.params.format) {
          if (req.params.format.toLowerCase() == '.json') {
            res.send(instance.toObject());
          }
          else {
            next(app.RestError.BadRequest.create('The \'' + req.params.format + '\' format is not supported at this time.'), req, res);
          }
        }
        else {
          var options = {};
          options[this.cont.name] = instance.toObject();
          res.render(this.cont.name + '/show', options);
        }
      }
    });
  }
});

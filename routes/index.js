module.exports = function(){
  var app;

  return {
    init: function(expressApp){
      app = expressApp;
    },

    index: function(req, res){
      res.render('index', { title: 'Express' })
    },

    notificationType: {
      index: function(req, res){
        app.controllers.NotificationTypeController.list(function(err, instance){
          res.send(instance);
        });
      }
    }
  }
}();
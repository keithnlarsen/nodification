module.exports = ( function(){
  var baseRoute = require('../libs/baseroute');

  var notificationTypeRoute = baseRoute.extend({
    name: 'notificationType'
  });

  return notificationTypeRoute;
}());

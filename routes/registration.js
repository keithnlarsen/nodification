module.exports = ( function(){
  var baseRoute = require('../libs/baseroute');

  var registrationRoute = baseRoute.extend({
    name: 'registration'
  });

  return registrationRoute;
}());

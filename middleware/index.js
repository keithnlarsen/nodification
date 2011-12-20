module.exports = (function(){
  var registrationMiddleware = require( '../middleware/registrationMiddleware' );
  var eventMiddleware = require( '../middleware/eventMiddleware' );

  function init(nodificationApp){
    registrationMiddleware.init(nodificationApp);
    eventMiddleware.init(nodificationApp);
  }

  return {
    registration: {},
    event: {},

    init: init
  }
}());
module.exports = (function(){
  var registrationMiddleware = require( '../middleware/registrationMiddleware' );


  return {
    registration: {},

    init: function(controllers){
      this.registration = registrationMiddleware.init(controllers);
    }
  }
}());
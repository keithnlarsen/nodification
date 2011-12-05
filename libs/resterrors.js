var sys = require('sys');
var baseObject = require('./baseobject');

var baseRestError = baseObject.extend({
  name: 'restError',
  title: 'Rest Error',
  description: '',
  message: '',

  _construct: function(message) {
    this.message = message;
    Error.call(this, message);
    Error.captureStackTrace(this, arguments.callee);
  },

  toString: function() {
    return this.title + ": " + this.message;
  }
});

sys.inherits(baseRestError, Error);

var restErrors = {
  badRequest: baseRestError.extend({
    name: 'badRequest',
    title: 'Bad Request',
    description: 'The request could not be understood by the server due to malformed syntax.',
    httpStatus: 400
  }),
  notFound: baseRestError.extend({
    name: 'notFound',
    title: 'Not Found',
    description: 'The requested resource could not be found.',
    httpStatus: 404
  })
};

var errorMapper = {
  'restError': function(error, request, response) {
    response.render('restError/restError.jade', {
      title: error.title,
      status: error.httpStatus,
      error: error
    });
  },
  'default': function(error, request, response) {
    console.log(error);

    response.render('restError/500.jade', {
      title: 'Error',
      status: 500,
      error: error
    });
  }
};

var errorHandler = function(error, request, response) {
  var constructorName = error.prototype ? error.prototype.constructor.name : 'default';
  var errorHandler = errorMapper[error.name] || errorMapper[constructorName];

  errorHandler(error, request, response);
};

module.exports.baseRestError = baseRestError;
module.exports.errors = restErrors;
module.exports.errorMapper = errorMapper;
module.exports.errorHandler = errorHandler;

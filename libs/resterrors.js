module.exports = ( function () {
  var sys = require( 'sys' );
  var baseObject = require( './baseobject' );
  var log4js = require( 'log4js' );
  log4js.addAppender(log4js.fileAppender('logs/nodification.log'), 'nodification');

  var logger = log4js.getLogger( 'nodification' );
  logger.setLevel('WARN');

  var baseRestError = baseObject.extend( {
    name: 'restError',
    title: 'Rest Error',
    description: '',
    message: '',

    _construct: function ( message ) {
      this.message = message;
      Error.call( this, message );
      Error.captureStackTrace( this, arguments.callee );
    },

    toString: function () {
      return this.title + ": " + this.message;
    }
  } );

  var initLogger = function ( app ) {
    app.configure( function () {
      app.use( log4js.connectLogger( logger ) );
    });
    return logger;
  };

  sys.inherits( baseRestError, Error );

  var restErrors = {
    badRequest: baseRestError.extend( {
      name: 'badRequest',
      title: 'Bad Request',
      description: 'The request could not be understood by the server due to malformed syntax.',
      httpStatus: 400
    } ),
    notFound: baseRestError.extend( {
      name: 'notFound',
      title: 'Not Found',
      description: 'The requested resource could not be found.',
      httpStatus: 404
    } ),
    conflict: baseRestError.extend( {
      name: 'conflict',
      title: 'Conflict',
      description: 'There was a conflict that prevented the operation from continuing.',
      httpStatus: 409
    } ),
    unsupportedMediaType: baseRestError.extend( {
      name: 'unsupportedMediaType',
      title: 'Unsupported Media Type',
      description: 'The server is refusing to service the request because the entity of the request is in a format not supported by the requested resource.',
      httpStatus: 415
    } )
  };

  var errorMapper = {
    'restError': function ( error, request, response ) {
      response.render( 'restError/restError.jade', {
        title: error.title,
        status: error.httpStatus,
        error: error
      } );
    },
    'default': function ( error, request, response ) {
      console.log( error );

      response.render( 'restError/500.jade', {
        title: 'Error',
        status: 500,
        error: error
      } );
    }
  };

  function errorHandler ( error, request, response ) {
    var constructorName = error.prototype ? error.prototype.constructor.name : 'default';
    var errorHandler = errorMapper[error.name] || errorMapper[constructorName];

    errorHandler( error, request, response );
  }

  return {
    baseRestError: baseRestError,
    errors: restErrors,
    errorMapper: errorMapper,
    errorHandler: errorHandler,
    initLogger: initLogger
  };

}());
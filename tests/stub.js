/**
 * Creates a Stub method which you can bind to a mock object for testing purposes.
 *
 * @param {object} err
 * @param {object} callBackValue
 *
 * Examples:
 *
 *  // You can declare your stub in one of 2 ways
 *  var mockObject = {};
 *  // 1. This will when executed in the method you are testing it assuming it is being called asynchronously
 *  mockObject.method = new Stub( errValue, callbackValue);
 *  // 2. This will result in the stub being called synchronously
 *  mockObject.method = new Stub( returnValue );
 *
 *  // Inspect your mock later
 *  mockObject.method.called.withArguments(args);
 *  mockObject.method.called.withAnyArguments();
 *  mockObject.method.called.withNoArguments();
 */
module.exports = function( err, callBackValue ) {
  var Stub = function() {
    Stub.args = arguments;
    Stub.thisArg = this;

    Stub.called = {
      withArguments: function() {
        for ( var i = 0; i < arguments.length; i ++ ) {
          if ( JSON.stringify( Stub.args[i] ) !== JSON.stringify( arguments[i] ) ) {
            throw new Error( ' Actual arguments: ' + JSON.stringify( Stub.args[i] ) + ' does not match expected: ' + JSON.stringify( arguments[i] ) );
          }
        }
        return true;
      },

      withAnyArguments: function() {
        if ( arguments.length == 0 ) {
          throw new Error( ' was not called with any arguments.' );
        }
        return true
      },

      withNoArguments: function() {
        if ( arguments.length > 0 ) {
          throw new Error( ' was called with arguments.' );
        }
        return arguments.length == 0;
      }
    };

    if ( arguments.length > 0 ) {
      if ( typeof arguments[arguments.length - 1] === 'function' ) {
        var callBack = arguments[arguments.length - 1];
        callBack( err, callBackValue );
      } else {
        if ( err ) {
          throw err;
        } else {
          return callBackValue;
        }
      }

    }
  };

  Stub.prototype.called = {
    withArguments: function() {
      return false
    },
    withAnyArguments: function() {
      return false
    },
    withNoArguments: function() {
      return false
    }
  };

  return Stub;
};
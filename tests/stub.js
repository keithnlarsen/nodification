/**
 * Creates a Stub method which you can bind to a mock object for testing purposes.
 *
 * @param {object} err
 * @param {object} returnValue
 *
 * Examples:
 *
 *   var stub = require('stub');
 *   var mockObject = {};
 *
 *   // You can declare your stub in one of 2 ways:
 *   // 1. This will setup your mock so it will execute asynchronously and pass
 *   //    'errValue' and 'callbackValue' to the callback in the system under test.
 *   mockObject.method = stub.async( errValue, callbackValue);
 *
 *   // 2. This will setup your mock so it will exectue synchronously and return 'returnValue' to the caller.
 *   mockObject.method = stub.sync( returnValue );
 *
 *   // Inspect your mock later
 *   mockObject.method.called.withArguments(args);
 *   mockObject.method.called.withAnyArguments();
 *   mockObject.method.called.withNoArguments();
 */
module.exports = ( function() {
  Number.prototype.nth= function(){
      if(this> 3 && this<21) return this+'th';
      var suffix= this%10;
      switch(suffix){
          case 1:return this+'st';
          case 2:return this+'nd';
          case 3:return this+'rd';
          default:return this+'th';
      }
  };

  var AssertionError = require('assert').AssertionError;

  function Stub ( err, returnValue, synchronous ) {
    var stub = function() {

      stub.args = arguments;
      stub.thisArg = this;

      stub.called = {
        withArguments: function() {
          for ( var i = 0; i < arguments.length; i ++ ) {
            if ( JSON.stringify( stub.args[i] ) !== JSON.stringify( arguments[i] ) ) {
              throw new AssertionError( {
                message: '\n\tThe ' + (i + 1).nth() + ' parameter contained: \n\t\t' + JSON.stringify( stub.args[i] ) + ' \n\tinstead of the expected value: \n\t\t' + JSON.stringify( arguments[i] ),
                stackStartFunction: stub.called.withArguments
              } );
            }
          }
          return true;
        },

        withAnyArguments: function() {
          if ( arguments.length == 0 ) {
            throw new AssertionError( {
              message: 'The method was called with 0 arguments but at least 1 was expected.',
              stackStartFunction: stub.called.withAnyArguments
            } );
          }
          return true
        },

        withNoArguments: function() {
          if ( arguments.length > 0 ) {
            throw new AssertionError( {
              message: 'The method was called with ' + arguments.length + ' arguments but non were expected.',
              stackStartFunction: stub.called.withNoArguments
            } );
          }
          return arguments.length == 0;
        }
      };

      if ( !synchronous ) {
        var callBack = arguments[arguments.length - 1];
        callBack( err, returnValue );
      } else {
        if ( err ) {
          throw err;
        } else {
          return returnValue;
        }
      }
    };

    stub.prototype.called = {
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

    return stub;
  }

  return {
    async: function( err, returnValue ) {
      return new Stub( err, returnValue, false );
    },
    sync: function( err, returnValue ) {
      return new Stub( err, returnValue, true );
    }
  }

}());
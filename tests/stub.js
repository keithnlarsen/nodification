module.exports = function(err, callBackValue) {
  var stub = function() {
    //stub.called = true;
    stub.args = arguments;
    stub.thisArg = this;

    stub.called = {
      withArguments: function() {
        for (var i = 0; i < arguments.length; i ++) {
          if (JSON.stringify(stub.args[i]) !== JSON.stringify(arguments[i]))
            throw new Error(" Actual arguments: " + JSON.stringify(stub.args[i]) + " does not match expected: " + JSON.stringify(arguments[i]));
          //return false;
        }
        return true;
      },

      withAnyArguments: function() {
        return arguments.length > 0;
      },

      withNoArguments: function() {
        return arguments.length == 0;
      }
    };

    if (arguments.length > 0)
    {
      if (typeof arguments[arguments.length -1] === "function")
      {
        var callBack = arguments[arguments.length - 1];
        callBack(err, callBackValue);
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
};
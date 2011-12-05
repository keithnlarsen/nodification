module.exports = ( function () {
  var ejs = require('ejs');
  var fs = require('fs');
  var path = require('path');

  return {
    merge: function(templateName, locals, callBack) {
      fs.readFile(templateName, 'utf8', function(err, template) {
        if (err) {
          callBack(new Error('Could not load account template: \'' + templateName + '\'\n' + err), null);
        }

        callBack(null, ejs.render(template, locals));
      });
    }
  }
}());
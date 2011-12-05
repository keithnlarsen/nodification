describe('Nodification.Tests.Unit.Views.RegistrationView', function() {

  var should = require('should');
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/nodification-dev');
  var Registration = require('../../../models').init(mongoose).registration.model;
  var templateName = 'views/registration/index.html';
  var templateEngine = require('../../../libs/templateengine');

  beforeEach(function(done) {
    done();
  });

  afterEach(function(done) {
    done();
  });

  describe('.index', function() {
    it('should transform a list of registrations into registration index page', function(done) {
      var registration1 = new Registration();
      registration1.notificationKey = 'test 1';

      var registration2 = new Registration();
      registration2.notificationKey = 'test 2';

      var locals = {
        locals: {
          registrations: [registration1, registration2],
          fileName: templateName
        }
      };

      templateEngine.merge(templateName, locals, function(err, registrationIndexHtml) {
        should.exist(registrationIndexHtml);
        // TODO: need to test for specific html stuff here.
//        console.log(registrationIndexHtml);
        done(err);
      });
    });
  });
});
describe('Nodification.Tests.Unit.Views.RegistrationView', function() {

  var should = require('should');
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/nodification-dev');
  var models = require('../../../models').init(mongoose);
  var Registration = models.registration.model;
  var NotificationType = models.notificationType.model;
  var listTemplate = 'views/registration/index.html';
  var newTemplate = 'views/registration/new.html';
  var templateEngine = require('../../../libs/templateengine');

  beforeEach(function(done) {
    done();
  });

  afterEach(function(done) {
    done();
  });

  describe('.index', function() {
    it('should take a list of registrations and build a registration index page', function(done) {
      var registration1 = new Registration();

      registration1.notificationType = new NotificationType();
      registration1.notificationType.name = "test";
      registration1.key = 'test 1';
      registration1.registrationConfirmed = true;

      var registration2 = new Registration();
      registration2.notificationType = new NotificationType();
      registration1.notificationType.name = "test";
      registration2.key = 'test 2';
      registration2.registrationConfirmed = true;

      var locals = {
        locals: {
          registrations: [registration1, registration2],
          fileName: listTemplate
        }
      };

      templateEngine.merge(listTemplate, locals, function(err, registrationIndexHtml) {
        should.exist(registrationIndexHtml);
        // TODO: need to test for specific html stuff here.
//        console.log(registrationIndexHtml);
        done(err);
      });
    });
  });

  describe('.new', function() {
    it('should take a list of notificationTypes and build a create new registration page', function(done) {
      var notificationType1 = new NotificationType();
      notificationType1.Name = 'test 1';

      var notificationType2 = new NotificationType();
      notificationType2.Name = 'test 1';

      var locals = {
        locals: {
          notificationTypes: [notificationType1, notificationType2],
          fileName: newTemplate
        }
      };

      templateEngine.merge(newTemplate, locals, function(err, registrationIndexHtml) {
        should.exist(registrationIndexHtml);
        // TODO: need to test for specific html stuff here.
//        console.log(registrationIndexHtml);
        done(err);
      });
    });
  });

});
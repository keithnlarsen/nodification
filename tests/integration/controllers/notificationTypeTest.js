describe('Nodification.Controllers.NotificationTypeController', function(){

  var should = require('should');
  var createJSON = "{\"name\":\"Test\",\"registrationUrl\":\"url\",\"userName\": \"username\",\"password\": \"password\"}";
  var updateJSON = "{\"name\":\"Test2\",\"registrationUrl\":\"url2\",\"userName\": \"username2\",\"password\": \"password2\"}";
  var mongoose = require('mongoose');
  var newId = '';
  var notificationType;
  var controller;

  before( function(done){
    // Setup our connection to the database and load our model and controller
    mongoose.connect('mongodb://localhost/nodification-dev');
    notificationType = require('../../../models/notificationType.js').NotificationType(mongoose);
    controller = require('../../../controllers/notificationType.js').NotificationTypeController(notificationType);
    // Just in case something bad happened, let's clear out the database
    notificationType.remove({}, function(err){
      done(err)
    });
  });

  after(function(done){
    // Clear out our database once we are done
    notificationType.remove({}, function(err){
      done(err)
    });
  });

  describe('.insert(JSON, fn)', function(){
    it('should create a new NotificationType', function(done){
      controller.insert(JSON.parse(createJSON), function(err, actual) {
        var expected = JSON.parse(createJSON);

        newId = actual._id.toString();
        newId.should.be.a('string');
        actual.name.should.equal(expected.name);
        actual.registrationUrl.should.equal(expected.registrationUrl);
        actual.userName.should.equal(expected.userName);
        actual.password.should.equal(expected.password);

        done(err);
      });
    });
    it('should fail to insert a duplicate name record', function(done){
      controller.insert(JSON.parse(createJSON), function(err, actual) {
        should.exist(err);
        err.message.should.match(/duplicate key error/);
        done();
      });
    })
  });

  describe('.get(Id, fn)', function(){
    it('should return a single NotificationType when given an existing Id', function(done){
      controller.get(newId, function(err, actual) {
        var expected = JSON.parse(createJSON);

        actual.name.should.equal(expected.name);
        actual.registrationUrl.should.equal(expected.registrationUrl);
        actual.userName.should.equal(expected.userName);
        actual.password.should.equal(expected.password);

        done(err);
      });
    });

    it('should return null when given a non-existing Id', function(done){
      controller.get(new mongoose.Types.ObjectId('111111111111111111111111'), function(err, actual) {
        should.not.exist(actual);
        done(err);
      });
    });
  });

  describe('.getByName(name, fn)',function(){
    it('should return a single NotificationType when given an existing name', function(done){
      controller.getByName('Test', function(err, actual) {
        var expected = JSON.parse(createJSON);

        actual.name.should.equal(expected.name);
        actual.registrationUrl.should.equal(expected.registrationUrl);
        actual.userName.should.equal(expected.userName);
        actual.password.should.equal(expected.password);

        done(err);
      });
    });
  });

  describe('.update(Id, JSON, fn)', function(){
    it('should update an existing NotificationType', function(done){
      controller.update(newId, JSON.parse(updateJSON), function(err, actual) {
        var expected = JSON.parse(updateJSON);

        actual.name.should.equal(expected.name);
        actual.registrationUrl.should.equal(expected.registrationUrl);
        actual.userName.should.equal(expected.userName);
        actual.password.should.equal(expected.password);

        done(err);
      });
    });
    it('should return null when trying to Update a NotificationType That Doesn\'t Exist', function(done){
      controller.update(new mongoose.Types.ObjectId('111111111111111111111111'), JSON.parse(updateJSON), function(err, actual) {
        should.not.exist(actual);
        done(err);
      });
    });
  });

  describe('.list(fn)', function(){
    it('should return all NotificationTypes', function(done){
      controller.list(function(err, actual) {
        // TODO: figure out how to test for array
        //actual.should.be.a("array");
        actual.length.should.be.greaterThan(0);
        done(err);
      });
    });
  });

  describe('.remove(Id, fn)', function(){
    it('should delete person when called with an existing Id', function(done){
      controller.remove(newId, function(err, actual) {
        // TODO: Figure out how to test ObjectId's
        //actual._id.toString().should.equals(newId.toString());
        done(err);
      });
    });
    it('should return nulls when called with an Id that doesn\'t exist', function(done){
      controller.remove(new mongoose.Types.ObjectId('111111111111111111111111'), function(err, actual) {
        should.not.exist(actual);
        done(err);
      });
    });
  });
});
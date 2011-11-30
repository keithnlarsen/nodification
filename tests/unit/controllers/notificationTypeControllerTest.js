describe('Nodification.Tests.Unit.Controllers.NotificationTypeController', function(){

  var should = require('should');
  var stub = require('../../stub.js');
  var controller;
  var createJSON;
  var notificationType;

  beforeEach( function(done){
    // Setup our connection to the database and load our model and controller
    notificationType = new stub();
    controller = require('../../../controllers/notificationTypeController.js').create(notificationType);
    createJSON = JSON.parse("{\"name\":\"Test\",\"registrationUrl\":\"url\",\"userName\": \"username\",\"password\": \"password\"}");
    done();
  });

  afterEach(function(done){
    done();
  });

  describe('.insert(json, fn)', function(){
    it('should call create and return newly created NotificationType', function(done){
      notificationType.create =  new stub(null, createJSON);

      controller.insert(createJSON, function(err, actual) {
        notificationType.create.called.withArguments(createJSON);
        actual.should.equal(createJSON);
        done();
      });
    });
    it('should return error that occurs when saving to database', function(done){
      notificationType.create = new stub({message: "error"}, null);

      controller.insert(createJSON, function(err, actual) {
        notificationType.create.called.withArguments(createJSON);
        err.message.should.equal("error");
        done();
      });
    });
  });


  describe('.get(id, fn)', function(){
    it('should call findById and return the results', function(done){
      notificationType.findById = new stub({message: "error"}, createJSON);

      controller.get("anything", function(err, actual) {
        notificationType.findById.called.withArguments("anything");
        err.message.should.equal("error");
        actual.should.equal(createJSON);
        done();
      });
    });
  });

  describe('.getByName(name, fn)', function(){
    it('should call findOne passing name and return the results', function(done){
      notificationType.findOne = new stub({message: "error"}, createJSON);

      controller.getByName("anything", function(err, actual) {
        notificationType.findOne.called.withArguments({name:"anything"});
        err.message.should.equal("error");
        actual.should.equal(createJSON);
        done();
      });
    });
  });

  describe('.list(fn)', function(){
    it('should call find and return the results', function(done){
      notificationType.find = new stub({message: "error"}, createJSON);

      controller.list(function(err, actual) {
        notificationType.find.called.withArguments({});
        err.message.should.equal("error");
        actual.should.equal(createJSON);
        done();
      });
    });
  });

  describe('.update(id, json, fn)', function(){
    it('should call update and then findById and return updated record', function(done){
      notificationType.update =  new stub(null);
      notificationType.findById = new stub(null, createJSON);

      controller.update("anything", createJSON, function(err, actual) {
        notificationType.update.called.withArguments({_id:"anything"}, createJSON);
        notificationType.findById.called.withArguments("anything");
        actual.should.equal(createJSON);
        done();
      });
    });
    it('should call update and return error that occurs', function(done){
      notificationType.update =  new stub({message:"error"});

      controller.update("anything", createJSON, function(err, actual) {
        notificationType.update.called.withArguments({_id:"anything"}, createJSON);
        err.message.should.equal("error");
        done();
      });
    });
    it('should call update and return nulls when \'Error: Element extends past end of object\' occurs', function(done){
      notificationType.update =  new stub("Error: Element extends past end of object");

      controller.update("anything", createJSON, function(err, actual) {
        notificationType.update.called.withArguments({_id:"anything"}, createJSON);
        should.not.exist(err);
        should.not.exist(actual);
        done();
      });
    });
  });

  describe('.remove(id, fn)', function(){
    it('should call findById and then call remove on the record returned', function(done){
      createJSON.remove = new stub({message:"error"});
      notificationType.findById = new stub(null, createJSON);

      controller.remove("anything", function(err, actual) {
        notificationType.findById.called.withArguments("anything");
        actual.remove.called.withNoArguments();
        err.message.should.equal("error");
        actual.should.equal(createJSON);
        done();
      });
    });
    it('should call findById and then return the error when no record found', function(done){
      notificationType.findById = new stub({message:"error"}, null);

      controller.remove("anything", function(err, actual) {
        notificationType.findById.called.withArguments("anything");
        err.message.should.equal("error");
        done();
      });
    });
  });
});
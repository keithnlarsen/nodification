describe('Nodification.Tests.Unit.Controllers.NotificationTypeController', function(){

  var createJSON = JSON.parse("{\"name\":\"Test\",\"registrationUrl\":\"url\",\"userName\": \"username\",\"password\": \"password\"}");
  var stub = require('../../stub.js');
  var notificationType;
  var controller;

  beforeEach( function(done){
    // Setup our connection to the database and load our model and controller
    notificationType = new stub();
    controller = require('../../../controllers/notificationType.js').NotificationTypeController(notificationType);
    done();
  });

  afterEach(function(done){
    done();
  });

  describe('.insert(JSON, fn)', function(){
    it('should call save on a new NotificationType instance', function(done){
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
        notificationType.create.called.withNoArguments(createJSON);
        err.message.should.equal("error");
        done();
      });
    });
  });


  describe('.get(Id, fn)', function(){
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

//
//  describe('.getByName(name, fn)',function(){
//    it('should return a single NotificationType when given an existing name', function(done){
//      controller.getByName('Test', function(err, actual) {
//        var expected = JSON.parse(createJSON);
//
//        actual.name.should.equal(expected.name);
//        actual.registrationUrl.should.equal(expected.registrationUrl);
//        actual.userName.should.equal(expected.userName);
//        actual.password.should.equal(expected.password);
//
//        done(err);
//      });
//    });
//  });
//
//  describe('.update(Id, JSON, fn)', function(){
//    it('should update an existing NotificationType', function(done){
//      controller.update(newId, JSON.parse(updateJSON), function(err, actual) {
//        var expected = JSON.parse(updateJSON);
//
//        actual.name.should.equal(expected.name);
//        actual.registrationUrl.should.equal(expected.registrationUrl);
//        actual.userName.should.equal(expected.userName);
//        actual.password.should.equal(expected.password);
//
//        done(err);
//      });
//    });
//    it('should return null when trying to Update a NotificationType That Doesn\'t Exist', function(done){
//      controller.update(new mongoose.Types.ObjectId('111111111111111111111111'), JSON.parse(updateJSON), function(err, actual) {
//        should.not.exist(actual);
//        done(err);
//      });
//    });
//  });
//
//  describe('.list(fn)', function(){
//    it('should return all NotificationTypes', function(done){
//      controller.list(function(err, actual) {
//        // TODO: figure out how to test for array
//        //actual.should.be.a("array");
//        actual.length.should.be.greaterThan(0);
//        done(err);
//      });
//    });
//  });
//
//  describe('.remove(Id, fn)', function(){
//    it('should delete person when called with an existing Id', function(done){
//      controller.remove(newId, function(err, actual) {
//        // TODO: Figure out how to test ObjectId's
//        //actual._id.toString().should.equals(newId.toString());
//        done(err);
//      });
//    });
//    it('should return nulls when called with an Id that doesn\'t exist', function(done){
//      controller.remove(new mongoose.Types.ObjectId('111111111111111111111111'), function(err, actual) {
//        should.not.exist(actual);
//        done(err);
//      });
//    });
//  });
});
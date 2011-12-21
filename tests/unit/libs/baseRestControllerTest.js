describe( 'nodification.tests.unit.libs.baseRestController', function () {

  var should = require( 'should' );
  var createJSON = JSON.parse( "{\"name\":\"Test\",\"field2\":\"url\"}" );
  var updateJSON = JSON.parse( "{\"name\":\"Test2\",\"field2\":\"url2\"}" );
  var mongoose = require( 'mongoose' );
//  var Stub = require( '../../stub' );
  var Schema = mongoose.Schema;
  var baseController = require( '../../../libs/baseRestController' );
  var testType;
  var testController;
  var newId = '';

  before( function ( done ) {
    // Setup our connection to the database and load our model and controller
    mongoose.connect( 'mongodb://localhost/nodification-dev' );
    testType = mongoose.model( 'TestType', new Schema( {
      name: String,
      field2: String
    } ) );

    var whatever = baseController.extend( {
      name: 'testType'
    } );

    testController = whatever.create( testType );

    // Just in case something bad happened, let's clear out the database
    testType.remove( {}, function ( err ) {
      done( err )
    } );
  } );

  after( function ( done ) {
    // Clear out our database once we are done
    testType.remove( {}, function ( err ) {
      done( err )
    } );
  } );

  describe( '.insert( req, res, done )', function () {
    it( 'should create a new testType', function ( done ) {
      var mockReq = { body: createJSON };

      var mockRes = {
        send: function ( body ) {
          newId = body._id.toString();
          body._id.should.be.a( 'object' );
          body.name.should.be.equal( "Test" );
          body.field2.should.be.equal( "url" );
          done()
        }
      };

      var next = function ( err ) {
        done( err );
      };

      testController.insert( mockReq, mockRes, next );

    } );

    // TODO: Test inserting duplicate

    // TODO: Test inserting another record
  } );

  describe( '.get( req, res, done )', function () {
    it( 'should get an existing testType', function ( done ) {
      var mockReq = {
        params: {
          id: newId
        }
      };
      var mockRes = {
        send: function ( body ) {
          body._id.should.be.a( 'object' );
          body.name.should.be.equal( "Test" );
          body.field2.should.be.equal( "url" );
          done();
        }
      };

      var next = function ( err ) {
        done( err );
      };

      testController.get( mockReq, mockRes, next );

    } );
  } );

  describe( '.update( req, res, done )', function () {
    it( 'should update an existing testType', function ( done ) {
      var mockReq = {
        params: {
          id: newId
        },
        body: updateJSON
      };

      var mockRes = {
        send: function ( body ) {
          newId = body._id.toString();
          body._id.should.be.a( 'object' );
          body.name.should.be.equal( "Test2" );
          body.field2.should.be.equal( "url2" );
          done()
        }
      };

      var next = function ( err ) {
        done( err );
      };

      testController.update( mockReq, mockRes, next );

    } );
  } );

  describe( '.list( req, res, done )', function () {
    it( 'should get a list of all existing testTypes', function ( done ) {
      var mockReq = {};
      var mockRes = {
        send: function ( body ) {
          body[0]._id.should.be.a( 'object' );
          body[0].name.should.be.equal( "Test2" );
          body[0].field2.should.be.equal( "url2" );
          done();

          // TODO: Test for both records after inserting 2 records
        }
      };

      var next = function ( err ) {
        done( err );
      };

      testController.list( mockReq, mockRes, next );
    } );
  } );

  describe( '.remove( req, res, done )', function () {
    it( 'should remove an existing testType', function ( done ) {
      var mockReq = {
        params: {
          id: newId
        }
      };
      var mockRes = {
        send: function () {
          done();
        }
      };

      var next = function ( err ) {
        done( err );
      };

      testController.remove( mockReq, mockRes, next );
    } );
    // TODO: test for removal of one records, then test for removal of second record.
  } );

} );
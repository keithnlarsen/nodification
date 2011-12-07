describe( 'Nodification.Tests.Unit.Libs.RestErrors', function() {

  var restErrors = require( '../../../libs/resterrors' );
  var restError = restErrors.errors;

  beforeEach( function( done ) {
    done();
  } );

  afterEach( function( done ) {
    done();
  } );

  describe( 'errorHandler(error, request, response)', function() {
    it( 'should map notFound Error to 404 NotFound response', function( done ) {
      var notFound = restError.notFound.create( 'Test Error' );
      var mockRequest = {};
      var mockResponse = {
        render: function ( template, config ) {
          template.should.equal( 'restError/restError.jade' );
          config.status.should.equal( 404 );
          config.error.message.should.equal( "Test Error" );
          done();
        }
      };

      restErrors.errorHandler( notFound, mockRequest, mockResponse );
    } );

    it( 'should map badRequest Error to 400 BadRequest response', function( done ) {
      var badRequest = restError.badRequest.create( 'Test Error' );
      var mockRequest = {};
      var mockResponse = {
        render: function ( template, config ) {
          template.should.equal( 'restError/restError.jade' );
          config.status.should.equal( 400 );
          config.error.message.should.equal( "Test Error" );
          done();
        }
      };

      restErrors.errorHandler( badRequest, mockRequest, mockResponse );
    } );

    it( 'should map Generic Errors to 500 InternalServerError response', function( done ) {
      var error = new Error( 'Test Error' );
      var mockRequest = {};
      var mockResponse = {
        render: function ( template, config ) {
          template.should.equal( 'restError/500.jade' );
          config.status.should.equal( 500 );
          config.error.message.should.equal( "Test Error" );
          done();
        }
      };

      restErrors.errorHandler( error, mockRequest, mockResponse );
    } );
  } );

  describe( 'restErrors.notfound', function() {
    it( 'should have constructor named notFound', function( done ) {
      var notFound = restError.notFound.create( 'Test Error' );
      notFound.name.should.equal( "notFound" );
      done();
    } );

    it( 'should inherit from Error', function( done ) {
      var notFound = restError.notFound.create( "Test Error" );
      notFound.prototype.name.should.equal( "Error" );
      done();
    } );

    it( 'should pass error message', function( done ) {
      var notFound = restError.notFound.create( "Test NotFound message." );
      notFound.message.should.equal( "Test NotFound message." );
      done();
    } );

    it( 'should throw notFound error', function( done ) {
      try {
        throw restError.notFound.create( "Test NotFound message." );
      }
      catch( err ) {
        err.name.should.equal( "notFound" );
        err.message.should.equal( "Test NotFound message." );
        err.prototype.name.should.equal( "Error" );
      }
      done();
    } );
  } );

  describe( 'restErrors.badRequest', function() {
    it( 'should have constructor named badRequest', function( done ) {
      var notFound = restError.badRequest.create( 'Test Error' );
      notFound.name.should.equal( "badRequest" );
      done();
    } );

    it( 'should inherit from Error', function( done ) {
      var notFound = restError.badRequest.create( "Test Error" );
      notFound.prototype.name.should.equal( "Error" );
      done();
    } );

    it( 'should pass error message', function( done ) {
      var notFound = restError.badRequest.create( "Test badRequest message." );
      notFound.message.should.equal( "Test badRequest message." );
      done();
    } );

    it( 'should throw badRequest error', function( done ) {
      try {
        throw restError.badRequest.create( "Test badRequest message." );
      }
      catch( err ) {
        err.name.should.equal( "badRequest" );
        err.message.should.equal( "Test badRequest message." );
        err.prototype.name.should.equal( "Error" );
      }
      done();
    } );
  } );
} );
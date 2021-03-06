describe( 'nodification.tests.unit.gateways.iosGateway', function () {

  var should = require( 'should' );
  var stub = require( 'stub.js' );
  var iosGateway = require( '../../../gateways/iosGateway' );
  var apns = require('apn');
  var mockEvent;
  var mockDevice;
  var mockVendor;
  var expectedNotification;

  beforeEach( function ( done ) {
    apns.Connection = stub.sync( null, { sendNotification : stub.sync() } );
    mockEvent = {
      badge: 2,
      alert: 'testAlert',
      payload: {'messageFrom': 'ios gateway test'}
    };
    mockDevice = {
      token: 'deviceToken'
    };
    mockVendor = {
      certData: 'cert.pem',
      keyData: 'key.pem',
      pushGatewayUrl: 'https://testurl.com:1234'
    };

    var myDevice = new apns.Device( mockDevice.token /*, ascii=true*/ );
    var notification = new apns.Notification();

    notification.badge = mockEvent.badge;
    notification.sound = "ping.aiff";
    notification.alert = mockEvent.alert;
    notification.payload = mockEvent.payload;
    notification.device = myDevice;

//    expectedNotification = JSON.stringify(notification);
    expectedNotification = notification;
    done();
  } );

  afterEach( function ( done ) {
    done();
  } );

  describe( '.sendNotification( notification )', function () {
    it( 'should send a properly constructed notification to the apns servers', function ( done ) {

      iosGateway.init( mockVendor, apns );
      iosGateway.sendNotification( mockEvent, mockDevice );

      apns.Connection().sendNotification.called.withArguments(expectedNotification);

      done( );
    } );
  } );

} );
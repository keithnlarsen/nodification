describe( 'nodification.tests.acceptance.application', function () {

  var http = require( 'http' );
  var should = require( 'should' );
  var stub = require( 'stub.js' );
  var createNotificationType = {
    name: 'Voicemail',
    registrationUrl: 'url',
    userName: 'username',
    password: 'password',
    vendors: [
      {
        type: 'ios',
        name: 'Apple Voicemail',
        keyData: 'Bag Attributes\n' +
          '    friendlyName: Daniel Lemmon\n' +
          '    localKeyID: 13 3B D9 05 30 7A 0D 4C 38 21 A2 5F 72 CD 27 24 64 D2 11 6C\n' +
          'Key Attributes: <No Attributes>\n' +
          '-----BEGIN RSA PRIVATE KEY-----\n' +
          'MIIEpAIBAAKCAQEAsW5wWOCnWKwDOjiBwF8R4orFQXRwul7TBpbd4A5aRmYBs5Bv\n' +
          'xVU9PYj2V0htTiKxuizs0fJqwlEA+B6n42LEaW+h74HLolk6Zx9+n8OJgBbe2Jl3\n' +
          'LEDSbA32OzEfHsc8t/so++EBcncpMHTaXn1+MfQ74nFbXn5MtJ+5lFnfPXZSY8rP\n' +
          'UGQZWQt3dMeRO6xtB3BF9KFPuqrxets+Vsdp7Giq/2Q1eZgytB5rvBwaR8qWbcrr\n' +
          'b4ESrZbUuBBxn/HMquBpx03gBFry0a4lWVCmE3Qtc0t8uTeLqX8lQkX5XQTnxqv4\n' +
          'V9nhhSFBtLJu6nctgWguFCsmtXrPjrojYSbptwIDAQABAoIBACi1Kdl6UWqqrGLj\n' +
          'LAGyziunovINgP+BWfEdE/Kf2F5mcOV9secYU2CW183WtB1FIHmSbRMOByhl5U8H\n' +
          '2YT12BJIpmKI6OtqhVe7hhWpixZ0KNSRASKKDLz1xxR1hKpPE8MyQIjpaqeUZ0LS\n' +
          'zHb5W8aiPksJrujTGU4nhzBeHjW/WesflXW0lZB6yu4IOZfT+4iYpFhFwPfmVG0p\n' +
          'c0Rhj1s/EGBi5Xa8FxxVn7u9dbUTImAvj4hMCZddScHiXG+K6lA/tej97VkHaQpM\n' +
          'gMICjvk8CZ6sOVFqf0CG3V5f9F35zXTnX1w6tDsWPYVzigM3oyZk50+gENJ+6HRp\n' +
          'gKNzgUECgYEA3uC/vJOXYxCgyBvM0AxzQFqga8K6OePEiBq0RjGlX66RVyTmCvNU\n' +
          'qvr1aTa0kwW2GxjI/gXvykAd8Q82X6XevWwzV7IAP4i6ZQ/UBrjVzjfAHO4mr1u2\n' +
          'Kgg59B4SxYspb8vMX99WJB7fwEhuB8JhV+l/vq0iAVjZUf0jXO3uMSkCgYEAy8y0\n' +
          'knoo76z/xeAtxTOfi2WSrfr5yuXTnA2URIaTGIeOQlw96cxzpdFTB0PeaXQwjLW/\n' +
          'zdCdcPWPwLyZiXcw7N3vXc1SJmRBPfqxIzcRVaX8nSzZwKuOCYVhSUwEkrkH4bK8\n' +
          '7TKsdS315o+7HbHDDHMzDBlXL0LkdC6aBrkpP98CgYAg+x0kaKrETBeexQ5f0xfS\n' +
          '9BY9HAm2u0+/3EPFB1+zcv+q55jrEer7ijt6oE/EWdoC1H4ZqQM86JQFsfyX1tHJ\n' +
          'MhO+7GZBAJikj90OSZfJ9lIFdfBfjrC8M49v4mtgtCEjnALYRRJYMgFmUNGHcGo7\n' +
          'OiBfNPuNO3qdOVpcTBEtUQKBgQC9Fadvw8GZZhRE/hLZRWVAizQFEbeS5ZtozTyE\n' +
          'O6vcdWCq9zRGaHfgIA99zR1dD/0/gB1+EpEQzfTbKOD3JswQ6HT+vdH7ZscVfzO8\n' +
          'bYo6we9X0NYTqdf1w3eY7tvLWbsTT6d0F7DkY4kjqrU7/sLuGTACiLxYUCLwHJCx\n' +
          'rje0VwKBgQCM9RrWzzbPRX9IJoZZZna/ZaRfnXlzhYuJUdi2k7x4BxKOEvP6EJhb\n' +
          '4rv+7rrj7+D8U+K011vRNaUJF7RWhQUYo0Eg+c4u4kwGT0fva7MyQuWieMQeohr/\n' +
          'tLVNIysZjHJJ9Pl6aeZA2nXz9ZBUZWW7K4924KbALiAPHCOYWogvRw==\n' +
          '-----END RSA PRIVATE KEY-----',
        certData: 'Bag Attributes\n' +
          '    friendlyName: Apple Development IOS Push Services: 99ALUKRU8L:99ALUKRU8L\n' +
          '    localKeyID: 13 3B D9 05 30 7A 0D 4C 38 21 A2 5F 72 CD 27 24 64 D2 11 6C\n' +
          'subject=/UID=ca.shaw.phoneportal/CN=Apple Development IOS Push Services: 99ALUKRU8L:99ALUKRU8L/C=CA\n' +
          'issuer=/C=US/O=Apple Inc./OU=Apple Worldwide Developer Relations/CN=Apple Worldwide Developer Relations Certification Authority\n' +
          '-----BEGIN CERTIFICATE-----\n' +
          'MIIFdzCCBF+gAwIBAgIITjKZXo576EwwDQYJKoZIhvcNAQEFBQAwgZYxCzAJBgNV\n' +
          'BAYTAlVTMRMwEQYDVQQKDApBcHBsZSBJbmMuMSwwKgYDVQQLDCNBcHBsZSBXb3Js\n' +
          'ZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9uczFEMEIGA1UEAww7QXBwbGUgV29ybGR3\n' +
          'aWRlIERldmVsb3BlciBSZWxhdGlvbnMgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkw\n' +
          'HhcNMTExMTE4MjEwNTQ4WhcNMTIxMTE3MjEwNTQ4WjB3MSMwIQYKCZImiZPyLGQB\n' +
          'AQwTY2Euc2hhdy5waG9uZXBvcnRhbDFDMEEGA1UEAww6QXBwbGUgRGV2ZWxvcG1l\n' +
          'bnQgSU9TIFB1c2ggU2VydmljZXM6IDk5QUxVS1JVOEw6OTlBTFVLUlU4TDELMAkG\n' +
          'A1UEBhMCQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCxbnBY4KdY\n' +
          'rAM6OIHAXxHiisVBdHC6XtMGlt3gDlpGZgGzkG/FVT09iPZXSG1OIrG6LOzR8mrC\n' +
          'UQD4HqfjYsRpb6HvgcuiWTpnH36fw4mAFt7YmXcsQNJsDfY7MR8exzy3+yj74QFy\n' +
          'dykwdNpefX4x9DvicVtefky0n7mUWd89dlJjys9QZBlZC3d0x5E7rG0HcEX0oU+6\n' +
          'qvF62z5Wx2nsaKr/ZDV5mDK0Hmu8HBpHypZtyutvgRKtltS4EHGf8cyq4GnHTeAE\n' +
          'WvLRriVZUKYTdC1zS3y5N4upfyVCRfldBOfGq/hX2eGFIUG0sm7qdy2BaC4UKya1\n' +
          'es+OuiNhJum3AgMBAAGjggHlMIIB4TAdBgNVHQ4EFgQUEzvZBTB6DUw4IaJfcs0n\n' +
          'JGTSEWwwCQYDVR0TBAIwADAfBgNVHSMEGDAWgBSIJxcJqbYYYIvs67r2R1nFUlSj\n' +
          'tzCCAQ8GA1UdIASCAQYwggECMIH/BgkqhkiG92NkBQEwgfEwgcMGCCsGAQUFBwIC\n' +
          'MIG2DIGzUmVsaWFuY2Ugb24gdGhpcyBjZXJ0aWZpY2F0ZSBieSBhbnkgcGFydHkg\n' +
          'YXNzdW1lcyBhY2NlcHRhbmNlIG9mIHRoZSB0aGVuIGFwcGxpY2FibGUgc3RhbmRh\n' +
          'cmQgdGVybXMgYW5kIGNvbmRpdGlvbnMgb2YgdXNlLCBjZXJ0aWZpY2F0ZSBwb2xp\n' +
          'Y3kgYW5kIGNlcnRpZmljYXRpb24gcHJhY3RpY2Ugc3RhdGVtZW50cy4wKQYIKwYB\n' +
          'BQUHAgEWHWh0dHA6Ly93d3cuYXBwbGUuY29tL2FwcGxlY2EvME0GA1UdHwRGMEQw\n' +
          'QqBAoD6GPGh0dHA6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2NlcnRpZmljYXRpb25h\n' +
          'dXRob3JpdHkvd3dkcmNhLmNybDALBgNVHQ8EBAMCB4AwEwYDVR0lBAwwCgYIKwYB\n' +
          'BQUHAwIwEAYKKoZIhvdjZAYDAQQCBQAwDQYJKoZIhvcNAQEFBQADggEBAJ9YssGY\n' +
          'qZyXTdwtOOnhmurqinBnHf5Yog2by4pMxs3LvxqeIr+9z1VmgOrYWSd1FKxmzK9H\n' +
          '7cfy90uRjrqhvu+8x+K7ceuiFVYAK7SWx6hSM8jhDJZ94UCTc9NAl7XfHNGagEsf\n' +
          'u7p2Js6ZnSli72D8CR18G1qpXrQ2+0bF2jo1EBDFHaLA8usrgxJBVZmAgMp1iOb6\n' +
          'XzYZZhnswU/WpCH5BYI8/CIzJ/PaSYeYTb2nm6MBlfhG0zlgtCDmnBGLJfTvQegJ\n' +
          'E36LT0oe5DUhJX082d60k9fnq+zRUgEXamfTPB3wzuVbY/3e5bnATQd8EOxJpAzw\n' +
          'xTTbOHmX5+XWXAg=\n' +
          '-----END CERTIFICATE-----',
        pushGatewayUrl: 'https://gateway.sandbox.push.apple.com:2195',
        feedbackGatewayUrl: 'https://feedback.sandbox.push.apple.com:2196',
        cacheLength: 0
      }
    ]
  };

//  {
//        type: 'ios',
//        name: 'Daniels iPhone',
//        token: '8ce71cc1 58c12f7c af0e799a 7ef112f9 2cc43a32 74f44072 dc925c09 a225c4bf'
//  },

  var createRegistration = {
    notificationType: '',
    key: '4035551212',
    registrationConfirmed: false,
    devices: [  {
      type: 'ios',
      name: 'T3 iPhone',
      token: '38626daf f457c387 4ffb7870 16d84ff6 96ed2476 caf8f3b2 aa04a3d9 97f90a0b'
    }, {
      type: 'ios',
      name: 'iPod Touch',
      token: '298aed9c 705d07e8 925979cf c24adb20 00152d62 203f6647 7c9ab92a 0640e505'
    } ]
  };

  var createEvent = {
    notificationType: '',
    registrationKey: '',
    badge: 1,
    alert: 'If you get this, please email us.',
    payload: {'messageFrom': 'Pamela Anderson'}
  };
  var newId = '';
  var newRegistrationKey = '';
  var notificationType;
  var app;

  var localhost = http.createClient( 3000, 'localhost' );
  var requestHandler = require( '../../libs/requestHandler' );

  before( function ( done ) {
    app = require( '../../app' );

//    app.listen( 3000 );
    console.log( 'Running testing server at http://127.0.0.1:3000/' + '\r\r' );

    // Delay to make sure that node server has time to start up on slower computers before running the tests.
    setTimeout( function () {
      app.models.notificationType.getModel().remove( {}, function ( err ) {
        app.models.registration.getModel().remove( {}, function ( err ) {
          done( err );
        } );
      } );
    }, 500 );
  } );

  after( function ( done ) {
//    app.models.notificationType.getModel().remove( {}, function ( err ) {
//      app.models.registration.getModel().remove( {}, function ( err ) {
//        done( err );
//      } );
//    } );
    done();
  } );

  describe( 'NotificationType', function () {
    it( 'should create a new NotificationType', function ( done ) {
      var request = localhost.request( 'PUT', '/notificationTypes', {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
      request.write( JSON.stringify( createNotificationType ) );

      requestHandler.handle( request, function ( err, response ) {
        var actual = JSON.parse( response.body );
        var expected = createNotificationType;

        newId = actual._id.toString();
        actual.name.should.equal( expected.name );
        actual.registrationUrl.should.equal( expected.registrationUrl );
        actual.userName.should.equal( expected.userName );
        actual.password.should.equal( expected.password );
        actual.vendors[0].name.should.equal( expected.vendors[0].name );
        actual.vendors[0].keyData.should.equal( expected.vendors[0].keyData );
        response.statusCode.should.equal( 201 );

        done();
      } );
    } );
  } );

  describe( 'Registration', function () {
    it( 'should create a new Notification Registration', function ( done ) {
      var request = localhost.request( 'PUT', '/registrations', {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );
      createRegistration.notificationType = newId;
      request.write( JSON.stringify( createRegistration ) );

      requestHandler.handle( request, function ( err, response ) {
        var actual = JSON.parse( response.body );
        var expected = createRegistration;

        newRegistrationKey = actual.key;
        actual.notificationType._id.should.equal( expected.notificationType );
        actual.key.should.equal( expected.key );
        actual.registrationConfirmed.should.equal( expected.registrationConfirmed );
        actual.devices[0].type.should.equal( expected.devices[0].type );
        actual.devices[0].name.should.equal( expected.devices[0].name );
        actual.devices[1].type.should.equal( expected.devices[1].type );
        actual.devices[1].name.should.equal( expected.devices[1].name );
//        app.gateways.notificationRegistration.Voicemail.register.called.withAnyArguments();

        response.statusCode.should.equal( 201 );

        done();
      } );
    } );
  } );

  describe( 'Send Event', function () {
    it( 'should create a new event and send it to registered devices at Apple!', function ( done ) {
      var request = localhost.request( 'PUT', '/events', {'Host': 'localhost', 'Accept': 'application/json', 'Content-Type': 'application/json'} );

      createEvent.notificationType = newId;
      createEvent.registrationKey = newRegistrationKey;

      request.write( JSON.stringify( createEvent ) );

      requestHandler.handle( request, function ( err, response ) {
        var actual = JSON.parse( response.body );
        var expected = createEvent;

        actual.notificationType._id.should.equal( expected.notificationType );
        actual.registrationKey.should.equal( expected.registrationKey );
        actual.badge.should.equal( expected.badge );
        actual.alert.should.equal( expected.alert );
//        actual.payload.should.equal( expected.payload );

        response.statusCode.should.equal( 201 );

        done();
      } );
    } );
  } );
} );
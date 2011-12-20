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
          'Proc-Type: 4,ENCRYPTED\n' +
          'DEK-Info: DES-EDE3-CBC,EE375F0A4BF2A725\n' +
          '\n' +
          '3QYz3Vo/VxGs9VRILOMw8FwAnv40l01dQJfNg3CR11QsQSOfT8lzZtkSaGR0JESD\n' +
          'miiD7cjZLuo7RtY85Tchy5hrU7r7f6MTWUx5bnGeU/oNcY3hw0toU9ZQfvqP6zI1\n' +
          'rmvq1ms/xmYi5HVLWDLLAb0XwlBNXQs0Y5ZoE983RlWkHSjvVqkwC/I999BeJ6/f\n' +
          'P9Esnq7WB1QLm9ZOgVbnZ1/VPPZPgFm4JIjt6FVR9yPGvCU5sfWVcLMroHHr5yyw\n' +
          'ZBBF331ufIxb9Dss5Eb006NweVJnszKwVsqZtIeMfYepQtIts+wT/J4Jj/kh8Xqv\n' +
          'rVFUiMbbJhqDmiNq8ayrx02etqlu18jieCg36ziWwcfNfsqS3NkX5+TzszYWhJ5R\n' +
          'h4a9HMqXakU0UARhab00Eps5VZeQcNRBBajvpmDGlF1ltwqVIJiEh9h22pTnGdVW\n' +
          'wQht1F9IX9wGvVgKlfiCrA/TB/75ZIvjlIcfeIqEFuiUDrUFMLi2pccMlG33mArF\n' +
          'zFRppoK3ZDMhvezBIS85RYiWL0MrL5zJCsHR4GpssQUZNWFPUxDx6B52KQi0urO7\n' +
          'hGVPBVzDbAKzNmzz2EspxvIY0s0uB4G5uLIn6D65mtjUbqVSc8jQH3usSqDhWUPs\n' +
          'L60bolmrOrC+U4TtzE66dtfX98cDmDzHodZabSk81Hm6PYG1xfj/kL9azTn1HECp\n' +
          'Fcse0VivEnuiUfKzpcdh6K7TqoKlV2m51xWiI5kaGwefdu/5s56kDblbxzBueJBN\n' +
          'UQ4zU//F3uyWcdv4fHOtkYcpC6gvWop1punBAL9Hhc2eTlP5IAoREJFzWCQdT3VE\n' +
          'OZMev/m51f4RogoJKMK/zAwCEH55ujJfV8hAKvPNEMScqGTu2OnLnHiSo3F1bxZw\n' +
          'sWGPkVJl2kFCA+GppKhIW/a2zJmAtWyq4UuKddMi1EBj9/ritoVYNEi3X6zil7qJ\n' +
          'h/QCv/alTql6fDZtWWoGK6s4PjeQOnSKmZ6xReSg2tf6wmYIDAZjuy7qXwn2c3kl\n' +
          'kJhfKp+Z3Vn4O8mP79bFFdIVgwx94xFpgWm2JPDzaWOob0POJyFOJKISXXwaN2jh\n' +
          'yJujBv3PsGFRXBRXCelleia841AEFC8OWC38zuom4T94eh9m4KZpVh12SRdXESUS\n' +
          'FqU4tHexrM1NEC+Ik5YjtaLNthsAWe0lu7yuJ4Ca00t4XSqGHY5jruHHC1TE+yXd\n' +
          'Yx3JJKf1kxJJaPf2sZOVQOw4Zt1PF/QFeauzdGoibMRrKThNbFRODaO65xsopaXW\n' +
          'BYHi10/fccOisNmno6YYkPwrjc3bM8wMwDBlUl/cwrpz1U07gd002G0u8Apf1oGj\n' +
          'ADYzwtlgQjeCVGnd9eYtYFdWRNEaio8+dcQ6I2fPSCp1N7j5Ma/JTwS87TZOJ/Rm\n' +
          'AYGAzy/7bAFwPesoY1FohW3PZjgnvGyonW2v8i2cOXAau6+frz4ZSBkrb+zKW8nl\n' +
          '40hpu4gRZK7jAZQRlKrsnYYdYXYFUlRDGIMLDHvKJ55dGTFPtfKOwt2VXRH/0ZE7\n' +
          'tmdpqwWQLMjqc+34zhl4qJaEw8DtExD3W6APtbzj49nIkHP6WuCIVXCu9vGKeiOf\n' +
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
        pushGatewayUrl: 'https://gateway.push.apple.com:2195',
        feedbackGatewayUrl: 'https://feedback.push.apple.com:2196',
        cacheLength: 0
      }
    ]
  };

  var createRegistration = {
    notificationType: '',
    key: '4035551212',
    registrationConfirmed: false,
    devices: [
      {
        type: 'ios',
        name: 'iPhone',
        token: ''
      }
    ]
  };

  var createEvent = {
    notificationType: '',
    registrationKey: '',
    badge: 1,
    alert: 'test event',
    payload: {}
  };
  var newId = '';
  var newRegistrationKey = '';
  var notificationType;
  var app;

  var localhost = http.createClient( 3000, 'localhost' );
  var requestHandler = require( '../../libs/requestHandler' );

  before( function ( done ) {
    app = require( '../../app' );

    app.listen( 3000 );
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
    app.models.notificationType.getModel().remove( {}, function ( err ) {
      app.models.registration.getModel().remove( {}, function ( err ) {
        done( err );
      } );
    } );
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

      app.gateways.notificationRegistration.Voicemail = { register: stub.async( null, true ) };

      requestHandler.handle( request, function ( err, response ) {
        var actual = JSON.parse( response.body );
        var expected = createRegistration;

        newRegistrationKey = actual.key;
        actual.notificationType._id.should.equal( expected.notificationType );
        actual.key.should.equal( expected.key );
        actual.registrationConfirmed.should.equal( expected.registrationConfirmed );
        actual.devices[0].type.should.equal( expected.devices[0].type );
        actual.devices[0].name.should.equal( expected.devices[0].name );
        app.gateways.notificationRegistration.Voicemail.register.called.withAnyArguments();

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
        actual.payload.should.equal( expected.payload );

        response.statusCode.should.equal( 201 );

        done();
      } );
    } );
  } );

} );
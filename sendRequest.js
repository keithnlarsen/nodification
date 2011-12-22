var apns = require('apn');

var options = {
//    cert: 'apns-dev-cert.pem',                 /* Certificate file */
    cert: 'cert.pem',
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
//    certData: null,                   /* Optional: if supplied uses this instead of Certificate File */
    key:  'apns-dev-key-noenc.pem',                  /* Key file */
//    key: 'key.pem',
//    keyData: null,                    /* Optional: if supplied uses this instead of Key file */
    gateway: 'gateway.sandbox.push.apple.com',/* gateway address */
    port: 2195,                       /* gateway port */
    enhanced: true,                   /* enable enhanced format */
    errorCallback: errorCallback,         /* Callback when error occurs */
    cacheLength: 0                    /* Number of notifications to cache for error purposes */
};

var apnsConnection = new apns.Connection(options);

var myDevice = new apns.Device('8ce71cc1 58c12f7c af0e799a 7ef112f9 2cc43a32 74f44072 dc925c09 a225c4bf' /*, ascii=true*/);

var note = new apns.Notification();

note.badge = 3;
note.sound = "ping.aiff";
note.alert = "You have a new message";
note.payload = {'messageFrom': 'Pamela Anderson'};
note.device = myDevice;

var res = apnsConnection.sendNotification(note);
console.log("Response: " + res);

function errorCallback ( number, notification ) {
    console.log('Error: ' + number + ' ' + notification);
}

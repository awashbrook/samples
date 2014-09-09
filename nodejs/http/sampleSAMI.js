var https = require("https");

// We should:
//  1) Check for empty file on Release Share after package upload to SAMI
//  2) Also verify SAMI MD5 matches our locally generated MD5
///

// Check for empty packageurl as frequently empty files are uploaded to SAMI-BIN Release Share
// Use HTTP HEAD to verify that "Content-Length" is specified
// Zero-length file release-0.1.0-478.x86_64.rpm have no "Content-Length" header at all!
// e.g.  curl --head https://sami.cdt.int.thomsonreuters.com/binarystore/Releases/Mount17/cpit_compass/release-0.1.0-478.x86_64.rpm
//
//  Such Zero bytes file in SAMI BIN still has valid HASH!!!!!
//  https://sami-admin.cdt.int.thomsonreuters.com//MD5Hash.ashx/Releases/Mount17/cpit_compass/release-0.1.0-478.x86_64.rpm

function samiHeadCall(package, cb) {
  // https://sami.cdt.int.thomsonreuters.com/binarystore/Releases/Mount17/cpit_compass/release-0.1.0-478.x86_64.rpm
  var options = {
    method: 'HEAD',
    // BE VERY CAREFUL to PREFIX path with '/' or you get all kinds of 4xx or 5xx errors
    path: '/binarystore/Releases/Mount17/cpit_compass/' + package,
    host: 'sami.cdt.int.thomsonreuters.com'
  };
  console.info('Options prepared:');
  console.info(options);
  console.info('Do the HEAD call');

  var request = https.request(options, function (response) {
    console.info("Status Code: ", response.statusCode); // Why are we getting 400 not 200?
    console.info("Content-Type: ", response.headers['content-type']);
    console.info("Content-Length: ", response.headers['content-length']);
//    console.info("headers: ", response.headers);
//    headers:  { date: 'Wed, 06 Aug 2014 16:03:40 GMT',
//      server: 'Apache',
//      connection: 'close',
//      'content-type': 'text/html; charset=iso-8859-1' }
    var buffer = '';
    response.on('data', function (chunk) {
      buffer += chunk;
    });
    response.on('end', function () {
      console.info('HEAD result:\n');
      process.stdout.write(buffer);

      console.info('Received END Event!');
    });
    response.resume();
  });

  request.on('error', function (e) {
    console.error('HTTP Error talking to SAMI-BIN Release Share: ' + e.message);
    process.exit(1);
//    cb(e);
  });

  request.end();
}

//samiHeadCall('puppet-master-package-1.0.10.auto-17.tar');
samiHeadCall('release-0.1.0-478.x86_64.rpm'); // Empty


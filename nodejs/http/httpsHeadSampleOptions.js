
// http://stackoverflow.com/questions/16148403/using-node-js-to-connect-to-a-rest-api/16155551#16155551
// get walking directions from central park to the empire state building
var https = require("https");

//AW Can only get 502 from github and no content length (when you don't prefix path with '/')
// Now get 302 like chrome
// Not all sites advertize content length, stackoverflow does!!
//https://awashbrook:Tibco123@github.com/danwrong/restler/archive/3.1.0.tar.gz
//url = "https://github.com/danwrong/restler/archive/3.1.0.tar.gz";
//var options = {
//  host: 'github.com',
//  path: '/danwrong/restler/archive/3.1.0.tar.gz',
//  method: 'HEAD'
//};

//Hah, our webmail is https and returns length to curl over raw inet - this one works
//var options = {
//  method: 'HEAD',
//  host: 'webmail.thomsonreuters.com'
//};

// Unlike curl and chrome, Node does not get Content-Length from SAMI BIN with HEAD, only with GET.
// In both cases error code is bad-request 400...

// https://s.sa.robot:Manager2010@sami.cdt.int.thomsonreuters.com/binarystore/Releases/Mount17/cpit_compass/release-0.1.0-478.x86_64.rpm
var options = {
  method: 'HEAD',
  auth: 's.sa.robot:Manager2010',
  // BE VERY CAREFUL to PREFIX path with '/' or you get all kinds of 4xx or 5xx errors
//  path: '/binarystore/Releases/Mount17/cpit_compass/release-0.1.0-478.x86_64.rpm', // Empty
  path: '/binarystore/Releases/Mount17/cpit_compass/puppet-master-package-1.0.10.auto-17.tar',
  host: 'sami.cdt.int.thomsonreuters.com'
};

console.info('Options prepared:');
console.info(options);
console.info('Do the call');

var request = https.request(options, function (response) {

  console.info("Status Code: ", response.statusCode);
  console.info("Content-Type: ", response.headers['content-type']);
  console.info("Content-Length: ", response.headers['content-length']);
  console.info("headers: ", response.headers);

  var buffer = "",
    data;

  response.on("data", function (chunk) {
    buffer += chunk;
  });

  response.on("end", function (err) {
//    console.log(buffer);
    console.log("finished transferring data\n");
  });
});

request.on('error', function (e) {
  console.error('HTTP Error: ' + e.message);
  process.exit(1);
});

request.end();

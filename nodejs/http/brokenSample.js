var http = require("http");

//var options = {
//  hostname: 'www.googleBLAH.com',
//  port: 80,
//  path: '/upload',
//  method: 'POST'
//};

//  var options = {
//    host: 'ermt-app-tst.emea1.ciscloud',
//    path: '/api/v1/' + "method",
//    method: 'PUT',
//    headers: {
//      'Content-Type': 'application/json',
//      'Content-Length': Buffer.byteLength("data", 'utf8')
//    }
//  };



// Arguments
var args = process.argv.slice(2);

if (args.length != 2) {
  console.error("CUDL REST Client expects exactly two args: <component> <version>");
  process.exit(1);
}

var component = args[0];
var version = args[1];
//var component = "puppet-master-package";
//var version = "1.0.10.auto-2";

// Fixed
//var cudlApi = "http://ermt-app-tst.emea1.ciscloud/api/v1/componentversions";
//var httpRepoUrl = "http://pcpuppetmoma.amers1.ciscloud/puppet-master-package-1.0.10.auto-2.tar";
//var httpRepoUrl = "http://upg-fileserver.emea1.ciscloud/compass/";
var httpRepoUrl = "https://sami.cdt.int.thomsonreuters.com/binarystore/Releases/Mount17/cpit_compass/"

var componentversion = JSON.stringify({
  platform: "compass",
  uid: "config:componentversion:aggregator:" + component + "-" + version,
  sourceid: component + "-" + version,
  type: "componentversion",
  componentgroup: "compass",
  nature: "config",
  componentreleaseversion: version,
  component: "compass_puppet",
  packageurl: httpRepoUrl + component + "-" + version + ".tar",
  puppetvalidated: "", // Setting or resetting to blank will trigger puppet master jenkins
  source: "aggregator"
});


var options = {
  host: 'ermt-app-tst.emea1.ciscloud',
  path: '/api/v1/' + 'componentversion',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(componentversion, 'utf8')
  }
};
console.info('Options prepared:');
console.info(options);
console.info('Data prepared:');
console.info(componentversion);
console.info('Do the PUT call');


var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8'); /////////////////////////////// Poom's concern
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(componentversion);
//req.write('data\n');
req.end();

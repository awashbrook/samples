
//http://stackoverflow.com/questions/24538520/node-js-head-request-returns-hpe-invalid-content-length-error

var http = require("http");

var options = {
  host: 'stackoverflow.com',
  path: 'questions/24538520/node-js-head-request-returns-hpe-invalid-content-length-error',
  method: 'HEAD'
};

http.request(options, function(res) {
  console.dir(res);
  console.info(res.headers);
  res.resume();
}).end();


//var https = require("https");
//
//var url = 'https://s.sa.robot:Manager2010@sami.cdt.int.thomsonreuters.com/binarystore/Releases/Mount17/cpit_compass/release-0.1.0-478.x86_64.rpm'
//
//var options = {
//  auth: 's.sa.robot:Manager2010',
//  host: 'sami.cdt.int.thomsonreuters.com',
//  path: 'binarystore/Releases/Mount17/cpit_compass/puppet-master-package-1.0.10.auto-17.tar',
//  method: 'HEAD'
//};
//
//https.request(options, function(res) {
//  console.dir(res);
//  res.resume();
//}).end();

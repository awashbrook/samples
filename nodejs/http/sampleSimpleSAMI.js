
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
//
//var options = {
//  host: 'sami.cdt.int.thomsonreuters.com',
//  path: 'binarystore/Releases/Mount17/cpit_compass/puppet-master-package-1.0.10.auto-17.tar',
//  method: 'HEAD'
//};
//
//https.request(options, function(res) {
//  console.dir(res);
//  res.resume();
//}).end();

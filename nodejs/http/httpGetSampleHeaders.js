
// http://stackoverflow.com/questions/16148403/using-node-js-to-connect-to-a-rest-api/16155551#16155551
// get walking directions from central park to the empire state building
var http = require("http");

// Not all sites advertize content length, stackoverflow does!!
url = "http://stackoverflow.com/questions/24538520/node-js-head-request-returns-hpe-invalid-content-length-error";

// get is a simple wrapper for request()
// which sets the http method to GET
var request = http.get(url, function (response) {

  console.info("Status Code: ", response.statusCode);
  console.info("Content-Type: ", response.headers['content-type']);
  console.info("Content-Length: ", response.headers['content-length']);
  console.info("headers: ", response.headers);

  // data is streamed in chunks from the server
  // so we have to handle the "data" event
  var buffer = "",
    data;

  response.on("data", function (chunk) {
    buffer += chunk;
  });

  response.on("end", function (err) {
    // finished transferring data
    // dump the raw data
//    console.log(buffer);
    console.log("\n");
  });
});

request.on('error', function (e) {
  console.error('HTTP Error: ' + e.message);
  process.exit(1);
});


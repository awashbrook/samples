//http://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request

var http = require("https");

//AW Can only get 502 from github and no content length
// This code sample gets errors also from github and SAMI

// Most sites we can't test as they used chunked and don't set content-length!

  var options = {
    method: 'HEAD',
    host: 'webmail.thomsonreuters.com'
  };

//  Hah, but https://www.google.co.uk/ does set it, but not for bots...only chrome :)
//var options = {
//  method: 'HEAD',
//  host: 'www.google.co.uk'
//};

//https://awashbrook:Tibco123@github.com/danwrong/restler/archive/3.1.0.tar.gz
//url = "https://github.com/danwrong/restler/archive/3.1.0.tar.gz";
//var options = {
//  auth: 'awashbrook:Tibco123',
//  host: 'github.com',
//  method: 'GET',
//  path: 'danwrong/restler/archive/3.1.0.tar.gz'
//};

//// https://s.sa.robot:Manager2010@sami.cdt.int.thomsonreuters.com/binarystore/Releases/Mount17/cpit_compass/release-0.1.0-478.x86_64.rpm
//var options = {
//  auth: 's.sa.robot:Manager2010',
//  host: 'sami.cdt.int.thomsonreuters.com',
//  path: 'binarystore/Releases/Mount17/cpit_compass/release-0.1.0-478.x86_64.rpm',
//  method: 'GET'
//};

// AW This one works on internet / not with proxies, does node respect HTTP_PROXY?!
// Returns 200 and sets Content-Length - doesn't work with https site?
//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
//var options = {
//  method: 'GET',
//  host: 'www.random.org',
//  path: '/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
//};

console.info('Options prepared:');
console.info(options);
console.info('Do the call');

callback = function(response) {

  console.info("Status Code: ", response.statusCode);
  console.info("Content-Type: ", response.headers['content-type']);
  console.info("Content-Length: ", response.headers['content-length']);
  console.info("headers: ", response.headers);

  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
//    console.log(str);
  });
}

http.request(options, callback).end();

/**
 * Description:
 * Author: jiangfeng (jiangfeng@tomstaff.com)
 * Update: 2013-07-11 10:17
 */

var http = require('http');
var url = require('url');

function start(route, handle){
  function onRequet(request, response) {
//    console.log("Request received");
    var pathname = url.parse(request.url).pathname;
    console.log('pathname:' + pathname);

    route(handle, pathname);

    response.writeHead(200, {
      "Content-Type": "text/plain"
    });
    response.write("Hello Wrold");
    response.end();
  }

  http.createServer(onRequet).listen(8888);
  console.log("Server has started");
}

exports.start = start;
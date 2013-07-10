var server,
  ip = "127.0.0.1",
  port = 8888,
  http = require('http');

server = http.createServer(function(req, res){
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('Head World');
}).listen(port, ip);

console.log("server is running" + ip + ":" + port);
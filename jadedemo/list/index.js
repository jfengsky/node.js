//var http = require('http');
var url = require("url");
var qs = 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash';

var obj = url.parse(qs, true, true);
console.log(obj);
//http.createServer(function(req, res){
//  res.writeHead(200, {
//    'Content-Type': 'text/plain'
//  });
//
//  var content = "";
//  res.end(content);
//}).listen(8000);
//
//console.log("http://localhost:8000 has started.");
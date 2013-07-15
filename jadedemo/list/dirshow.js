var http = require('http'),
  url = require("url"),
  fs = require("fs");
  fileList = [];

function fileBodyList(el){
  var tpl = '<!doctype html><html>'+
    '<head>'+
    '<meta "charset=UTF-8" />'+
    '</head>'+
    '<body>'+ el +
    '</body>'+
    '</html>';
  return tpl;
}

http.createServer(function(req, res){
  var pathName = url.parse(req.url).pathname,
    fileListlink = '';
  res.writeHead(200,{
    'Content-Type': 'text/plain'
  });
  fs.readdir('.', function(err, list) {

    var fileLength = list.length;
    for(var i = 0; i < fileLength; i++) {
      fileListlink += '<li>' + list[i] + '</li>'
    }
    res.write(fileBodyList(fileListlink));
    res.end();
  });

}).listen(8000);

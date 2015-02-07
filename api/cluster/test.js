// 多线程模块

var cluster = require('cluster');

var http = require('http');

var numCPUs = require('os').cpus().length;

console.log(cluster);

if(cluster.isMaster){
  for(var i = 0; i < numCPUs; i++){
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal){
    console.log('worker' + worker.process.pid + ' died')
  })
} else {
  http.createServer(function(req, res){
    res.writeHead(200);
    res.end('hello wrld\n');

  }).listen(8000);
}
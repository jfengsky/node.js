//var childProcess = require('child_process');
//
//var ls = childProcess.exec('ls -l', function(error, stdout, stderr){
//  console.log(stderr);
//});

//var exec = require('child_process').exec;
//var child = exec('ls -l');
//
//child.stdout.on('data', function(data){
//  console.log(data);
//});
//
//child.on('close', function(code){
//  console.log(code);
//});

//var path = " -l";
//childProcess.exec('ls' + path, function(err, data){
//  console.log(data);
//})

var child_process = require('child_process');

var path = '.';

child_process.execFile('/bin/ls', ['-l', path], function(err, result){
  console.log(result);
})
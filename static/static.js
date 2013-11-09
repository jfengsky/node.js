/**
 * Created by Terry(terry.jiang@bertelsmann.com.cn) on 13-11-9.
 */

var http = require('http');
var fs = require('fs');
http.get('http://localhost:3000/', function(res){
  var data = '';
  res.on('data', function(chunk){
    data += chunk;
  });
  res.on('end', function(){
    console.log(data);
    fs.writeFile('./html/demo.html', data, 'ascii', function(err){
      console.log('save success');
    });
  })
});
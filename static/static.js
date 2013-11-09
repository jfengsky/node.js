/**
 * Created by Terry(terry.jiang@bertelsmann.com.cn) on 13-11-9.
 */

var http = require('http');
var fs = require('fs');

function toHtml(url, filePathName){
  http.get(url, function(res){
    var data = '';
    res.on('data', function(chunk){
      data += chunk;
    });
    res.on('end', function(){
      console.log(data);
      fs.writeFile(filePathName, data, 'ascii', function(err){
        console.log(filePathName + ' save success');
      });
    })
  });
}

toHtml('http://localhost:3000/', './html/demo.html');
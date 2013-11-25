/**
 * Created by Terry(terry.jiang@bertelsmann.com.cn) on 13-11-9.
 */

var http = require('http');
var fs = require('fs');
var path = require('path');

// ensure dir created recursively.
fs.ensureDir = function (dir) {
  if (!fs.existsSync(dir)) {
    fs.ensureDir(path.dirname(dir));
    fs.mkdirSync(dir);
  }
};

function toHtml(url, filePathName){
  http.get(url, function(res){
    var data = '';
    res.on('data', function(chunk){
      data += chunk;
    });
    res.on('end', function(){
    fs.ensureDir(path.dirname(filePathName));
      fs.writeFile(filePathName, data, 'utf-8', function(){
        console.log(filePathName + ' save success');
      });
    })
  });
}

var dir = path.resolve(__dirname, '../../_output/HTML/pages');

toHtml('http://localhost:3000/project', path.resolve(dir, 'index.html'));
// toHtml('http://localhost:3000/project', 'build/html/index.html');


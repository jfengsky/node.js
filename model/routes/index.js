
/*
 * GET home page.
 */

var fs = require('fs'),
//  path = require('path'),
  url = require('url');



function fileName(arr){
  var arrLength = arr.length,
      arrName = [''];
  if(arrLength > 0){
    for(var i = 0; i < arrLength; i ++){
      arrName.push(arr[i].split('.')[0]);
    }
  }
  return arrName;
}

module.exports = function(app){
  var viewDir = './views';

  app.get('/', function(req, res){
    res.render('index', { title: 'index'});
  });


  app.get('/getfileinfo', function(req, res){
    res.send(req.query.path);
  });

//  app.get('/', function(req, res){
//    var fileList = fs.readdirSync(viewDir),
//        fileStat,
//        fileLength = fileList.length,
//        fileInfo = [],
//        filesList = '';
//
//    if(fileLength > 0) {
//      for(var i = 0; i < fileLength; i++){
//        fileStat = fs.statSync(viewDir + '/' + fileList[i]);
//
//        fileInfo[0] = fileList[i];
//        fileInfo[1] = fileStat.size;
//        fileInfo[2] = new Date(fileStat.mtime).getTime();
//        fileInfo[3] = fileStat.isDirectory();
//
//        filesList += fileInfo.join('|') + ',';
//      }
//    };
//
//    res.render('index', { title: 'index'});
//  })
};
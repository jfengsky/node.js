
/*
 * GET home page.
 */

var fs = require('fs'),
  path = require('path');

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

function requestPath(app, path){
  var pathLength = path.length,
      fileName = '';
  if(pathLength > 0){
    for(var i = 0; i < pathLength; i++){
      fileName = path[i];
      app.get('/' + fileName, function(req, res){
        res.render(fileName, { title: fileName});
      });
    }
  }
}

module.exports = function(app){
  fs.readdir('./views', function(err, files){
    if(err){
      console.log('get files err');
    } else {
      requestPath(app,fileName(files));
    }
  });
};
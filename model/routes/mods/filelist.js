/**
 * User: jfengsky@gmail.com
 * Date: 13-7-30
 * Time: 上午10:50
 * 获取目录下的所有文件
 */
var fs = require('fs');

exports.filelist = function(modPath){
  fs.readdir(modPath, function(err, list){
//    var fileList = list;
//    for(var i = 0; i < list.length; i++){
//      fileList.push(list[i].replace('.jade',''));
//    }
    return list;
  });
}
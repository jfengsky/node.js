/**
 * Description: 获取目录下文件列表
 * Author: jiangfeng (jiangfeng@tomstaff.com)
 * Update: 2013-07-16 10:18
 */

var fs = require("fs");

exports.modlist = function(){
  return fs.readdir('.', function(err, list){
    console.log(list);
    return list;
  });
}


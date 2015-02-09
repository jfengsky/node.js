/**
 * 获取目录所有文件
 */
var fs = require('fs'),

getFolderList = {

  /**
   * 获取目录下的所有文件夹及文件信息
   * @param  {Object} _options  参数
   * @return
   */
  _readDir: function(_options){
    var ignore = _options.params.ignore.split('|'),
        dir = '';
        // TODO 2015 0209 获取文件目录及信息并返回
    _options.callback(_options.params);
  },

  init: function( _options ){
    this._readDir(_options);
  }
};

// function getFolderList() {
//   var self = this;

//   // 遍历的目录
//   var DIR = '/Volumes/SSD/Users/jiangfeng/www/git/Tour/Front/Front.PC.Online';

//   // 忽略的文件和目录名
//   var IGNORE = ['.git', '.gitignore', '.idea'];


//   /**
//    * 获取目录下的所有文件
//    * @param  {String} _dir  目录名
//    * @return
//    */
//   this._readDir = function(_dir) {
//     var fileInfo = [];
//     fs.readdir(_dir, function(err, _fileList) {
//       _fileList.forEach(function(_file) {
//         var file;
//         // 忽略一些不用显示的文件
//         if (IGNORE.indexOf(_file) == -1) {
//           file = DIR + '/' + _file;
//           fs.stat(file, function(_errStat, _fileStat) {
//             if(_fileStat.isDirectory()){
//               fileInfo.push({
//                 name: _file,
//                 isDir: true
//               });
//             } else {
//               fileInfo.push({
//                 name: _file,
//                 isDir: false
//               });
//             };
//           });
//           console.log(fileInfo);
//         }
//       });
//     });
//   };

//   this.init = function() {

//     this._readDir(DIR);

//   };
// }

module.exports = getFolderList;
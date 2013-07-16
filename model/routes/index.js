
/*
 * GET home page.
 */
var fs = require("fs"),
    fileList = [],
    modPath = './model/views';


fs.readdir(modPath, function(err, list){
  for (var i = 0; i < list.length; i++) {
    fileList.push(list[i].replace('.jade',''));
  }
});


exports.index = function(req, res){
  res.render('index', {
    title: 'Express',
    filelist: fileList
  });
};
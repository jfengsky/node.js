
/*
 * GET home page.
 */
var fs = require("fs"),
    fileList = [],
    modPath = './model/views';


fs.readdir(modPath, function(err, list){
  fileList = list
});


exports.index = function(req, res){
  res.render('index', {
    title: 'Express',
    filelist: fileList
  });
};
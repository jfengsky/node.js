
/*
 * GET home page.
 */

var fs = require('fs'),
  url = require('url');

module.exports = function(app){
  var walk = function(dir, done) {
    var results = [];
    var fileItem = {};
    fs.readdir(dir, function(err, list) {
      if (err) return done(err);
      var i = 0;
      (function next() {
        var file = list[i++],
            filename = file;
        if (!file) return done(null, results);
        file = dir + '/' + file;
        fs.stat(file, function(err, stat) {
          fileItem = filename + '|'+ file + '|' + stat.isDirectory() + '|' + stat.size + '|' + new Date(stat.mtime).getTime();
          results.push(fileItem);
          next();
        });
      })();
    });
  };


  /**
   * rotate path function
   */
  function createURL(path, pageName, els){
    app.get(path, function(req, res){
      res.render(pageName, els);
    });
  };

  createURL('/', 'index', {title: 'index'});


//  app.get('/', function(req, res){
//    res.render('index', { title: 'index'});
//  });

  app.get('/getfileinfo', function(req, res){
    walk('./', function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });



};
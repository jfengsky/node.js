
/*
 * GET home page.
 */
var readdirp = require('readdirp');

module.exports = function(app){
  
  readdirp({ 
    root: './views', 
    directoryFilter: ['!*_inc'], 
    fileFilter: [ '*.jade' ]
  }).on('data', function (entry) {
    // console.log(entry.name);
    console.log(entry.path)
    var url = entry.path.slice(0, -5);
    
    app.get('/' + url + '.html', function(req, res){
      res.render('index', { title: 'index'});
    });

  });


  // app.get('/', function(req, res){
  //   res.render('index', { title: 'index'});
  // });

};
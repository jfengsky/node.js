
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

    // console.log(entry.path);
    var url = entry.path.slice(0, -5);
    console.log(url);
    
    app.get('/' + url + '.html', function(req, res){
      res.render(url, { title: 'index'});
    });

  });


};
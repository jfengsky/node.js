/*
 * GET home page.
 */

// TODO 3001 不运行html服务

module.exports = function(app, readdirp) {

  readdirp({
    root: '../../../Code/HTML/views/api',
    directoryFilter: ['!*assets'],
    fileFilter: ['*.jade']
  }).on('data', function(entry) {

    var url = entry.path.split('\\').join('/').slice(0, -5);
    
    app.get('/' + url + '.html', function(req, res) {
      var devlop = false;
      if(req.query.dev === ''){
        devlop = true
      };
      res.render(url, {
        title: 'index',
        dev: devlop
      });
    });

  });

  // app.get('/', function(req, res){
  //   res.render('index', {title: 'IX前端开发'});
  // });
  
  // language test data
  var lang_resource = require('../../../Code/HTML/views/api/language/language_API.js');
  app.post('/common/language', function(req, res){
    res.send(lang_resource);
  });

  
}
/*
 * GET home page.
 */

module.exports = function(app, readdirp) {

  readdirp({
    root: '../../../Code/HTML/views/demo',
    directoryFilter: ['!*assets'],
    fileFilter: ['*.jade']
  }).on('data', function(entry) {

    var url = entry.path.split('\\').join('/').slice(0, -5);
    var pageName = entry.name.slice(0, -5);
    app.get('/' + url + '.html', function(req, res) {
      var devlop = false;
      if(req.query.dev === ''){
        devlop = true
      };
      res.render(url, {
        title: pageName,
        dev: devlop
      });
    });

  });
  
  // var lang_data = require('../../../Code/HTML/views/api/language/lang_test_data');
  // app.post('/common/language', function(req, res){
  //   res.send(lang_data);
  // });

}

/*
 * GET home page.
 */

module.exports = function(app){
  app.get('/', function(req, res){
    res.render('index', { title: 'index'});
  });
  app.get('/demo1', function(req, res){
    res.render('demo1', { title: 'demo1'});
  });
  app.get('/path/demo2', function(req, res){
    res.render('path/demo2', { title: 'demo2'});
  });
};
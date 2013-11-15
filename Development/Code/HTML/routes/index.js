
/*
 * GET home page.
 */


module.exports = function(app){

  app.get('/', function(req, res){
    res.render('index', {title: 'IX前端开发'});
  });

  // project
  app.get('/project', function(req, res){
    res.render('project/index', {title: 'IX'});
  });

  // doc

  app.get('/docs/', function(req, res){
    res.render('docs/default', {title: 'IX前端开发文档'});
  });

  app.get('/docs/html/', function(req, res){
    res.render('docs/html', {title: 'html规范文档'});
  });

  app.get('/docs/css/', function(req, res){
    res.render('docs/css', {title: 'html规范文档'});
  });

  app.get('/docs/js/', function(req, res){
    res.render('docs/js', {title: 'html规范文档'});
  });

  app.get('/docs/api/', function(req, res){
    res.render('docs/api', {title: 'html规范文档'});
  });

  // demo
  app.get('/demo/language/', function(req, res){
    res.render('demo/language_test/language', {title: '语言包测试'});
  });

}

/*
 * GET home page.
 */

//exports.index = function(req, res){
//  res.render('index', { title: 'Express' });
//};

module.exports = function(app){
  app.get('/', function(req, res){
    res.render('index', {title: 'express'});
  });

  app.post('/file-upload', function(req, res, next) {
    console.log(req.body);
    console.log(req.files);
  });
}
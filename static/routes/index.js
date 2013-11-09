
/*
 * GET home page.
 */
var fs = require('fs');
var path = require('path');

fs.readFile('./views/index.jade','ascii' , function(err, data){

  console.log(data);
  fs.writeFile('./html/demo.html', data, 'ascii', function(err){
    console.log('save success');
  });

});



module.exports = function(app){
  app.get('/', function(req, res){
    res.render('index', { title: 'index'});

  });

};
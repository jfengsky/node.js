var express = require('express');
var router = express.Router();
var formidable = require('formidable');

var fs = require('fs');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/uploadImage', function(req, res, next) {
  var form = new formidable.IncomingForm();

  var viewPath = 'http://localhost/github/node.js/upload/temp/';

  form.parse(req, function (error, fields, files) {
    console.log(fields);
    console.log(files);
    console.log('-----------');
    fs.renameSync(files.Filedata.path, '../temp/' + files.Filedata.name);
  });
  res.send({'success': true})
});

module.exports = router;

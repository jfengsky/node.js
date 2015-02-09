var express = require('express');
var router = express.Router();

var exec = require('child_process').exec;

var folderList = require('./folderlist');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/filelist', function(req, res, next) {
  folderList.init({
    params: req.body,
    callback: function( _data ){
      res.send(_data);
    }
  });
});

router.post('/cmd', function(req, res) {
  // res.send(req.body.command);
  // childProcess.exec('ls', function(error, stdout, stderr){
  //  console.log(stderr);
  //  // res.send( stderr )
  // });
  var child = exec(req.body.command);
  var sendData = '';
  child.stdout.on('data', function(data){
   sendData = data;
   res.send(sendData);
  });
  // res.send(sendData);

});

module.exports = router;

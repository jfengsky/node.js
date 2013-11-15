
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('../../../Code/HTML/routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../../../Code/HTML/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '../../../Code/HTML/assets')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  var cmd = '';
  for (var i = 2; i < process.argv.length; i++) {
    if (i > 2) {
      cmd += ' ';
    }
    cmd += process.argv[i];
  }
  if (cmd.length > 0) {
    require('child_process').exec(cmd);
  }
});

routes(app);
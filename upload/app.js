var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


app.use(multer({
    dest: '../temp/'
}))

app.use('/uploadImage', function(req, res, next) {
    var files = req.files.Filedata,
        resData = {
            "errno": 0,
            "errmsg": "Success",
            "data": []
        },
        tempData = {};
    console.log(req);
    if (Object.prototype.toString.call(files) === '[object Array]') {
        for (var i = 0; i < files.length; i++) {
            tempData = {
                "success": true,
                "ErrorMessage": null,
                "TempID": req.body.TempID[i],
                "ImageUrl": "http://localhost/github/node.js/upload/temp/" + files[i].name,
                "ImageId": 1000 + i
            }
            resData["data"].push(tempData)
        }
    } else {
        tempData = {
            "success": true,
            "ErrorMessage": null,
            "TempID": req.body.TempID,
            "ImageUrl": "http://localhost/github/node.js/upload/temp/" + files.name,
            "ImageId": 1000
        }
        resData["data"].push(tempData)
    }
    res.send(resData);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
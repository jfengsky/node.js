
var app = require('express').createServer(),
port = 1337;

app.listen(port);

app.get('/user/:id', function(req, res){
    res.send('user: ' + req.params.id);
});

app.get('/:number', function(req, res){
    res.send('number: ' + req.params.number);
});

console.log('start express server\n');
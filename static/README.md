###use cheerio to product html files
  
*	install cheerio
	
		npm install -g cheerio

*	example:

		var http = require('http');
		var fs = require('fs');
		http.get('http://localhost:3000/', function(res){
		  var data = '';
		  res.on('data', function(chunk){
		    data += chunk;
		  });
		  res.on('end', function(){
		    fs.writeFile('./demo.html', data, 'ascii', function(err){
		      console.log('save success');
		    });
		  })
		});
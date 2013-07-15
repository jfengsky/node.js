var fs = require("fs");

fs.readdir('.', function(err, list) {
  console.log(list);
});
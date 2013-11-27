define(function(require,exports,module){
	var head = require('../head');
	head.exec();
	exports.ttt = function(tx){
		alert(tx);
	}
});
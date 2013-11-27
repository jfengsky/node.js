define(function(require,exports,module){
	var $ = require('jquery');
	var base = require('./base/base');
	var verifica = require('./verifica');
	base.ttt('我已经弹出了base中的方法。')
	$('#tempDiv').html('jQuery 已经可以使用。');
	$('#yz').click(function(){
		verifica.exec();
	});
});
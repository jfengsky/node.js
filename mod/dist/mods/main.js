define("dist/main", [ "jquery", "./base/base", "./head", "./verifica" ], function(require, exports, module) {
    var $ = require("jquery");
    var base = require("./base/base");
    var verifica = require("./verifica");
    base.ttt("我已经弹出了base中的方法。");
    $("#tempDiv").html("jQuery 已经可以使用。");
    $("#yz").click(function() {
        verifica.exec();
    });
});

define("dist/base/base", [ "../head" ], function(require, exports, module) {
    var head = require("../head");
    head.exec();
    exports.ttt = function(tx) {
        alert(tx);
    };
});

define("dist/head", [], function(require, exports, module) {
    exports.exec = function() {
        alert("全站头部");
    };
});

define("dist/verifica", [], function(require, exports, module) {
    exports.exec = function() {
        alert("表单验证");
    };
});

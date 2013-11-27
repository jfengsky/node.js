define("dist/main-debug", [ "jquery-debug", "./base/base-debug", "./head-debug", "./verifica-debug" ], function(require, exports, module) {
    var $ = require("jquery-debug");
    var base = require("./base/base-debug");
    var verifica = require("./verifica-debug");
    base.ttt("我已经弹出了base中的方法。");
    $("#tempDiv").html("jQuery 已经可以使用。");
    $("#yz").click(function() {
        verifica.exec();
    });
});

define("dist/base/base-debug", [ "../head-debug" ], function(require, exports, module) {
    var head = require("../head-debug");
    head.exec();
    exports.ttt = function(tx) {
        alert(tx);
    };
});

define("dist/head-debug", [], function(require, exports, module) {
    exports.exec = function() {
        alert("全站头部");
    };
});

define("dist/verifica-debug", [], function(require, exports, module) {
    exports.exec = function() {
        alert("表单验证");
    };
});

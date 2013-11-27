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

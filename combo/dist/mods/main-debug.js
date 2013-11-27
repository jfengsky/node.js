define("dist/main-debug", [ "./lang/ang-debug.js", "./idb/db-debug.js" ], function(require) {
    var Lang = require("./lang/ang-debug");
    require("./idb/db-debug");
    new Lang();
});

define("dist/lang/ang-debug", [], function(require, exports, module) {
    // var $ = require('jquery');
    function $(id) {
        return document.getElementById(id);
    }
    function Lang() {
        $("J_btn").addEventListener("click", function() {
            alert(111);
        }, false);
    }
    module.exports = Lang;
});

define("dist/idb/db-debug", [], function(require) {
    console.log("Loaded db.js");
});

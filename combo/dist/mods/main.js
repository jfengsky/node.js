define("dist/main", [ "./lang/ang.js", "./idb/db.js" ], function(require) {
    var Lang = require("./lang/ang");
    require("./idb/db");
    new Lang();
});

define("dist/lang/ang", [], function(require, exports, module) {
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

define("dist/idb/db", [], function(require) {
    console.log("Loaded db.js");
});

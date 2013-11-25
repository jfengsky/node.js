define("examples/combotest/1.0.0/main-debug", [ "../idb/idb-debug", "./addtext-debug" ], function(require) {
    var indexDB = require("../idb/idb-debug");
    var addtext = require("./addtext-debug");
    new addtext("new text");
});

define("examples/combotest/1.0.0/addtext-debug", [], function(require, exports, module) {
    function Addtext(str) {
        $("#J_text").css("color", "#f60").html(str);
    }
    module.exports = Addtext;
});

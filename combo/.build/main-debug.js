define("dist/main-debug", [ "./lang/ang-debug.js", "./idb/db-debug.js" ], function(require) {
    var Lang = require("./lang/ang-debug");
    require("./idb/db-debug");
    new Lang();
});
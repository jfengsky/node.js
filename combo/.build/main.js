define("dist/main", [ "./lang/ang.js", "./idb/db.js" ], function(require) {
    var Lang = require("./lang/ang");
    require("./idb/db");
    new Lang();
});
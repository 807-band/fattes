"use strict";
const get = require("./get");
const set = require("./set");
const deleteFunc = require("./delete");
const pick = require("./pick");
const keys = require("./keys");
const entries = require("./entries");
const equals = require("./equals");
module.exports = {
    get,
    set,
    "delete": deleteFunc,
    pick,
    keys,
    entries,
    equals
};
//# sourceMappingURL=index.js.map
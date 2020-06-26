"use strict";
const obj = require("./object");
module.exports = (array) => array.filter((value, index, self) => self.findIndex((searchVal) => obj.equals(searchVal, value)) === index);
//# sourceMappingURL=unique_array_elements.js.map
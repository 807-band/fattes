"use strict";
const AWS = require("./sdk");
let customConverter;
function main() {
    return customConverter || AWS.DynamoDB.Converter;
}
main.set = (converter) => {
    customConverter = converter;
};
main.revert = () => {
    customConverter = undefined;
};
module.exports = main;
//# sourceMappingURL=converter.js.map
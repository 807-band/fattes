"use strict";
const AWS = require("../sdk");
let customDDB;
function main() {
    return customDDB || new AWS.DynamoDB();
}
main.set = (ddb) => {
    customDDB = ddb;
};
main.revert = () => {
    customDDB = undefined;
};
main.local = (endpoint = "http://localhost:8000") => {
    main.set(new AWS.DynamoDB({
        endpoint
    }));
};
module.exports = main;
//# sourceMappingURL=index.js.map
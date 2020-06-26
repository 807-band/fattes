"use strict";
const CustomError = require("./Error");
const Model_1 = require("./Model");
let models = {};
const returnObject = (input) => {
    if (input instanceof Model_1.Model) {
        models[input.name] = input;
        return input;
    }
    else if (typeof input === "string") {
        return models[input];
    }
    else {
        throw new CustomError.InvalidParameter("You must pass in a Model or table name as a string.");
    }
};
returnObject.clear = () => {
    models = {};
};
module.exports = returnObject;
//# sourceMappingURL=ModelStore.js.map
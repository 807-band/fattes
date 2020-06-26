"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ddb = require("./index");
const log = require("../../logger/emitter");
function main(method, params) {
    return __awaiter(this, void 0, void 0, function* () {
        log({ "level": "debug", "category": `aws:dynamodb:${method}:request`, "message": JSON.stringify(params, null, 4), "payload": { "request": params } });
        const result = yield ddb()[method](params).promise();
        log({ "level": "debug", "category": `aws:dynamodb:${method}:response`, "message": typeof result === "undefined" ? "undefined" : JSON.stringify(result, null, 4), "payload": { "response": result } });
        return result;
    });
}
module.exports = main;
//# sourceMappingURL=internal.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
const ddb = require("./aws/ddb/internal");
const utils = require("./utils");
const Error = require("./Error");
const ModelStore = require("./ModelStore");
var TransactionReturnOptions;
(function (TransactionReturnOptions) {
    TransactionReturnOptions["request"] = "request";
    TransactionReturnOptions["documents"] = "documents";
})(TransactionReturnOptions || (TransactionReturnOptions = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType["get"] = "get";
    TransactionType["write"] = "write";
})(TransactionType || (TransactionType = {}));
// TODO: seems like when using this method as a consumer of Dynamoose that it will get confusing with the different parameter names. For example, if you pass in an array of transactions and a callback, the callback parameter name when using this method will be `settings` (I THINK). Which is super confusing to the user. Not sure how to fix this tho.
exports.default = (transactions, settings = { "return": TransactionReturnOptions.documents }, callback) => {
    if (typeof settings === "function") {
        callback = settings;
        settings = { "return": TransactionReturnOptions.documents };
    }
    if (typeof transactions === "function") {
        callback = transactions;
        transactions = null;
    }
    const promise = (() => __awaiter(void 0, void 0, void 0, function* () {
        if (!Array.isArray(transactions) || transactions.length <= 0) {
            throw new Error.InvalidParameter("You must pass in an array with items for the transactions parameter.");
        }
        const transactionObjects = yield Promise.all(transactions);
        const transactionParams = {
            "TransactItems": transactionObjects
        };
        if (settings.return === TransactionReturnOptions.request) {
            return transactionParams;
        }
        let transactionType;
        if (settings.type) {
            switch (settings.type) {
                case TransactionType.get:
                    transactionType = "transactGetItems";
                    break;
                case TransactionType.write:
                    transactionType = "transactWriteItems";
                    break;
                default:
                    throw new Error.InvalidParameter("Invalid type option, please pass in \"get\" or \"write\".");
            }
        }
        else {
            transactionType = transactionObjects.map((a) => Object.keys(a)[0]).every((key) => key === "Get") ? "transactGetItems" : "transactWriteItems";
        }
        const modelNames = transactionObjects.map((a) => Object.values(a)[0].TableName);
        const uniqueModelNames = utils.unique_array_elements(modelNames);
        const models = uniqueModelNames.map((name) => ModelStore(name));
        models.forEach((model, index) => {
            if (!model) {
                throw new Error.InvalidParameter(`Model "${uniqueModelNames[index]}" not found. Please register the model with dynamoose before using it in transactions.`);
            }
        });
        yield Promise.all(models.map((model) => model.pendingTaskPromise()));
        // TODO: remove `as any` here (https://stackoverflow.com/q/61111476/894067)
        const result = yield ddb(transactionType, transactionParams);
        return result.Responses ? yield Promise.all(result.Responses.map((item, index) => {
            const modelName = modelNames[index];
            const model = models.find((model) => model.name === modelName);
            return new model.Document(item.Item, { "type": "fromDynamo" }).conformToSchema({ "customTypesDynamo": true, "checkExpiredItem": true, "saveUnknown": true, "type": "fromDynamo" });
        })) : null;
    }))();
    if (callback) {
        promise.then((result) => callback(null, result)).catch((error) => callback(error));
    }
    else {
        return promise;
    }
};
//# sourceMappingURL=Transaction.js.map
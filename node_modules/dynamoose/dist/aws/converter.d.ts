import * as AWS from "./sdk";
declare function main(): typeof AWS.DynamoDB.Converter;
declare namespace main {
    var set: (converter: typeof AWS.DynamoDB.Converter) => void;
    var revert: () => void;
}
export = main;

import * as AWS from "../sdk";
declare function main(): AWS.DynamoDB;
declare namespace main {
    var set: (ddb: AWS.DynamoDB) => void;
    var revert: () => void;
    var local: (endpoint?: string) => void;
}
export = main;

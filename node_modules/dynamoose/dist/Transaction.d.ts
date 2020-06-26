import { CallbackType } from "./General";
declare enum TransactionReturnOptions {
    request = "request",
    documents = "documents"
}
declare enum TransactionType {
    get = "get",
    write = "write"
}
export interface TransactionSettings {
    return: TransactionReturnOptions;
    type?: TransactionType;
}
declare const _default: (transactions: any[], settings: TransactionSettings, callback: CallbackType<any, any>) => any;
export default _default;

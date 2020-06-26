import { Model } from "../../Model";
import { Document } from "../../Document";
import { IndexItem } from "../../Schema";
export declare enum ModelIndexChangeType {
    add = "add",
    delete = "delete"
}
export interface ModelIndexAddChange {
    type: ModelIndexChangeType.add;
    spec: IndexItem;
}
export interface ModelIndexDeleteChange {
    type: ModelIndexChangeType.delete;
    name: string;
}
declare const index_changes: (model: Model<Document>, existingIndexes?: any[]) => Promise<(ModelIndexAddChange | ModelIndexDeleteChange)[]>;
export default index_changes;

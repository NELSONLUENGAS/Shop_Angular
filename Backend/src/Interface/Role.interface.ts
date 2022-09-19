import { HydratedDocument, Model } from "mongoose";

export interface IRole {
    name: string;
    enable: boolean;
    icon?: string;
}
export interface IRoleStatic extends Model<IRole> {
    findOrCreate(condition: any, doc: any): Promise<HydratedDocument<IRole>>;
}
import { HydratedDocument, Model } from "mongoose";

export interface IBrand {
    name: string;
    enable: boolean;
    icon?: string;
}
export interface IBrandStatic extends Model<IBrand> {
    findOrCreate(condition: any, doc: any): Promise<HydratedDocument<IBrand>>;
}
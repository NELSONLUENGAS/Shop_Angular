import { Document, HydratedDocument, Model, ObjectId, PopulatedDoc } from "mongoose";
import { IBrand } from "./Brand.interface";

export interface ICategory {
    name: string;
    enable: boolean;
    icon: string;
    brandID: PopulatedDoc<Document<ObjectId> & IBrand>
}

export interface ICategoryStatic extends Model<ICategory> {
    findOrCreate(condition: any, doc: any): Promise<HydratedDocument<ICategory>>;
}
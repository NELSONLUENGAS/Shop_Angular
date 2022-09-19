import { Document, HydratedDocument, Model, ObjectId, PopulatedDoc } from "mongoose";
import { IBrand } from "./Brand.interface";
import { ICategory } from "./Category.interface";

export interface IProduct {
    brandID: PopulatedDoc<Document<ObjectId> & IBrand>;
    categoryID: PopulatedDoc<Document<ObjectId> & ICategory>;
    reviewID?: PopulatedDoc<Document<ObjectId> >;
    name: string;
    price: number;
    STOCK: number;
    image: string;
    images?: string[];
    richDescription?: string;
    description?: string | object;
    enable: boolean;
}

export interface IProductStatic extends Model<IProduct> {
    findOrCreate(condition: any, doc: any): Promise<HydratedDocument<IProduct>>;
}
import { Document, HydratedDocument, Model, ObjectId, PopulatedDoc } from "mongoose";
import { IProduct } from "./Product.interface";
import { IUser } from "./User.interface";

export interface ICart {
    quantity: number;
    userID: PopulatedDoc<Document<ObjectId> & IUser>
    productID: PopulatedDoc<Document<ObjectId> & IProduct>
}

export interface ICartStatic extends Model<ICart> {
    findOrCreate(condition: any, doc: any): Promise<HydratedDocument<ICart>>;
}
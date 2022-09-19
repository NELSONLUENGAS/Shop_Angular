import { Document, HydratedDocument, Model, ObjectId, PopulatedDoc } from "mongoose";
import { ICart } from "./Cart.interface";
import { IOrder } from "./Order.interface";
import { IRole } from "./Role.interface";


export interface IUser {
    firstname: string;
    lastname?: string;
    email: string;
    password: string;
    age?: number;
    address?: string;
    shoppingAnddress1?: string;
    shoppingAnddress2?: string;
    country?: string;
    city?: string;
    provider: string;
    avatar?: string;
    login: boolean;
    enable: boolean;
    roles: PopulatedDoc<Document<ObjectId> & IRole>;
    orders?: PopulatedDoc<Document<ObjectId> & IOrder>;
    cart?: PopulatedDoc<Document<ObjectId> & ICart>;
}

export interface IUsertatic extends Model<IUser> {
    findOrCreate(condition: any, doc: any): Promise<HydratedDocument<IUser>>;
}
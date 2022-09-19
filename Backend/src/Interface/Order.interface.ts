import { Document, HydratedDocument, Model, ObjectId, PopulatedDoc } from "mongoose";
import { IUser } from "./User.interface";

export enum Status{
    PENDING = 'PENDING',
    PROCESSED = 'PROCESSED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    FAILED = 'FAILED'
}

export interface OrderItem{
    productId: string;
    quantity: number;
}

export interface LineItem{
    price_data?: PriceData
    quantity?: number;
}

interface PriceData{
    currency: string;
    product_data?: ProductData
    unit_amount?: number;
}

interface ProductData{
    name: string;
}

export interface IOrder {
    userID: PopulatedDoc<Document<ObjectId> & IUser>;
    status: string;
    totalPrice: number;
    orderItems?: OrderItem[];
    shippingAddress1?: string;
    shippingAddress2?: string;
    city?: string;
    zip?: string;
    country?: string;
    phone?: string;
}

export  interface IOrderStatic extends Model<IOrder> {
    findOrCreate(condition: any, doc: any): Promise<HydratedDocument<IOrder>>;
}
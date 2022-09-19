import { Schema, model, Types, } from 'mongoose';
import { IOrder, IOrderStatic, Status } from '../Interface/Order.interface';
import { findOrCreate } from './Utils/StaticMethod';

const OrderSchema = new Schema<IOrder, IOrderStatic>({
    userID: { 
        type: Types.ObjectId, 
        required: true, 
        ref: 'User'
    },
    status: { 
        type: String, 
        enum: Status 
    },
    totalPrice: Number,
    orderItems: Schema.Types.Mixed,
    shippingAddress1: String,
    shippingAddress2: String,
    city: String,
    zip: String,
    country: String,
    phone: String,
}, 
{ 
    timestamps: true 
});

OrderSchema.static('findOrCreate', findOrCreate);
export const OrderModel = model<IOrder, IOrderStatic>('Order', OrderSchema);
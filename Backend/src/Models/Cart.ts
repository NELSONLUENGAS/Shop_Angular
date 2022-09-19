import { Schema, model, Types } from 'mongoose';
import { ICart, ICartStatic } from '../Interface/Cart.interface';
import { findOrCreate } from './Utils/StaticMethod';

const CartSchema = new Schema<ICart, ICartStatic>({
    quantity: { 
        type: Number, 
        required: true 
    },
    userID: { 
        type: Types.ObjectId, 
        required: true, 
        ref: 'User'
    },
    productID: { 
        type: Types.ObjectId || [Types.ObjectId], 
        required: true,  
        ref: 'Product'
    },
},   
{ 
    timestamps: true 
});

CartSchema.static('findOrCreate', findOrCreate);
export const CartModel = model<ICart, ICartStatic>('cart', CartSchema);
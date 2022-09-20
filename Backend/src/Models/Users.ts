import { Schema, model, Types, } from 'mongoose';
import { IUser, IUsertatic } from '../Interface/User.interface';
import { findOrCreate } from '../Helpers/StaticMethod';

const Userchema = new Schema<IUser, IUsertatic>({
    firstname: { 
        type: String, 
        required: true, 
    },
    lastname: String,
    email: { 
        type: String, 
        required: true, 
    },
    password: { 
        type: String, 
        required: true
    },
    age: Number,
    address: String,
    shoppingAnddress1: String,
    shoppingAnddress2: String,
    country: String,
    city: String,
    provider: { 
        type: String, 
        required: true,
        default: 'local'
    },
    avatar: String,
    enable: { 
        type: Boolean, 
        required: true, 
        default: true
    },
    login: { 
        type: Boolean, 
        required: true, 
        default: true
    },
    roles:[{ 
        type: Types.ObjectId , 
        required: true, 
        default: '62c7290abc216df97fa8725f',
        ref: 'Role'
    }],
    orders:[{ 
        type: Types.ObjectId,
        ref: 'Order'
    }],
    cart: { 
        type: Types.ObjectId,
        ref: 'Cart'
    },
}, 
{ 
    timestamps: true 
});

Userchema.static('findOrCreate', findOrCreate);
export const UserModel = model<IUser, IUsertatic>('User', Userchema);
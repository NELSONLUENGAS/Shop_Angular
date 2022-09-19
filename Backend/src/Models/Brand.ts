import { Schema, model } from 'mongoose';
import { IBrand, IBrandStatic } from '../Interface/Brand.interface';
import { findOrCreate } from './Utils/StaticMethod';

const BrandSchema = new Schema<IBrand, IBrandStatic>({
    name: { 
        type: String, 
        required: true 
    },
    enable: { 
        type: Boolean, 
        required: true, 
        default: true 
    },
    icon: String,
},
{ 
    timestamps: true 
});

BrandSchema.static('findOrCreate', findOrCreate);
export const BrandModel = model<IBrand, IBrandStatic>('Brand', BrandSchema);
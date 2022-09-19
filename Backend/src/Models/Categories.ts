import { Schema, model, Types, } from 'mongoose';
import { ICategory, ICategoryStatic } from '../Interface/Category.interface';
import { findOrCreate } from './Utils/StaticMethod';

const CategorySchema = new Schema<ICategory, ICategoryStatic>({
    name: { 
        type: String, 
        required: true 
    },
    enable: { 
        type: Boolean, 
        required: true, 
        default: true 
    },
    icon: { 
        type: String,  
        required: false 
    },
    brandID:[{ 
        type: Types.ObjectId, 
        required: true, 
        ref: 'Brand'
    }],
}, 
{ 
    timestamps: true 
});

CategorySchema.static('findOrCreate', findOrCreate);
export const CategoryModel = model<ICategory, ICategoryStatic>('Category', CategorySchema);
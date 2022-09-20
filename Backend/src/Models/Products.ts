import { Schema, model, Types, } from 'mongoose';
import { IProduct, IProductStatic } from '../Interface/Product.interface';
import { findOrCreate } from '../Helpers/StaticMethod';

const ProductSchema = new Schema<IProduct, IProductStatic>({
    brandID: { 
        type: Types.ObjectId, 
        required: true, 
        ref:'Brand'
    },
    categoryID: { 
        type: Types.ObjectId, 
        required: true, 
        ref:'Category'
    },
    reviewID: [{ 
        type: Types.ObjectId, 
        required: true, 
        ref:'Review'
    }],
    name: { 
        type: String, 
        required: true
    },
    price: { 
        type: Number, 
        required: true
    },
    STOCK: { 
        type: Number, 
        required: true, 
        min: 0
    },
    image: { 
        type: String, 
        required: true,
    },
    images: [String],
    richDescription: String,
    description: { type: Schema.Types.Mixed },
    enable: { 
        type: Boolean, 
        required: true, 
        default: true
    },
}, 
{ 
    timestamps: true 
});

ProductSchema.static('findOrCreate', findOrCreate);
export const ProductModel = model<IProduct, IProductStatic>('Product', ProductSchema);
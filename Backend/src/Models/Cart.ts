import { prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose';
import { User } from './Users';
import { Products } from './Products';

@modelOptions({
    schemaOptions: {
        versionKey: false
    }
})
export class Cart {
    @prop({
        required: true,
        ref: 'Products'
    })
    public productID : Ref<Products>[]

    @prop({
        required: true,
        ref: 'User'
    })
    public userID: Ref<User>
}

export const CartModel = getModelForClass(Cart);
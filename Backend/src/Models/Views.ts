import { prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose';
import { User } from './Users';
import { Products } from './Products';

@modelOptions({
    schemaOptions: {
        versionKey: false
    }
})
export class Views {
    @prop({
        required: true,
        ref: 'User'
    })
    public userID : Ref<User>

    @prop({
        required: true,
        ref: 'Products'
    })
    public productID : Ref<Products>[]
}

export const ViewsModel = getModelForClass(Views);
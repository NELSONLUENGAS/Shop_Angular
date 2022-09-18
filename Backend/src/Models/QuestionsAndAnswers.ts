import { prop, getModelForClass, modelOptions,Ref } from '@typegoose/typegoose';
import { User } from './Users';
import { Products } from './Products';


@modelOptions({
    schemaOptions: {
        versionKey: false
    }
})
export class QA {
    @prop()
    question : string

    @prop()
    answer : string

    @prop({
        ref: () => User
    })
    userID : Ref<User>

    @prop({
        ref: () => Products
    })
    productID : Ref<Products>
}

export const  QAModel = getModelForClass(QA);
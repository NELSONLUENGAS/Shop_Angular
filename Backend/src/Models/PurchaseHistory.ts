import { prop, getModelForClass, modelOptions, Ref} from '@typegoose/typegoose';
import { Orders } from './Orders';
import { User } from './Users';

@modelOptions({
    schemaOptions: {
        versionKey: false
    }
})
export class PurchaseHistory {
    @prop({
        required: true,
        ref: () => User
    })
    userID : Ref<User>

    @prop({
        required: true,
        ref: () => Orders
    })
    ordersID : Ref<Orders>[]
}

export const PurchaseHistoryModel = getModelForClass(PurchaseHistory);
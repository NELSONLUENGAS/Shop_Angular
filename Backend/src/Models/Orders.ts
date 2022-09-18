import { prop, getModelForClass, plugin, modelOptions, Ref, Severity, defaultClasses } from '@typegoose/typegoose';
import { User } from './Users';
const findorcreate = require('mongoose-findorcreate');

enum Status{
    PENDING = 'PENDING',
    PROCESSED = 'PROCESSED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    FAILED = 'FAILED'
}

@modelOptions({
    schemaOptions: {
        versionKey: false,
        timestamps: true
    },
    options:{
        allowMixed: Severity.ALLOW
    }
})

@plugin(findorcreate)

export class Orders extends defaultClasses.FindOrCreate  {
    @prop({
        required: true,
        ref: () => User
    })
    public userID : Ref<User>

    @prop({
        enum: Status
    })
    public status : Status

    @prop({
        required: false,
        type: () => [Object]
    })
    public description ?: Object[]

    @prop({
        required: true
    })
    public totalPrice : number

    @prop({
        type: () => [Object]
    })
    public orderItems ?: Object[]

    @prop()
    public shippingAnddress1 ?: string

    @prop()
    public shippingAnddress2 ?: string

    @prop()
    public city ?: string

    @prop()
    public zip ?: string

    @prop()
    public country ?: string

    @prop()
    public phone ?: string

}


export const OrdersModel = getModelForClass(Orders);

export interface OrderItem{
    productId: string;
    quantity: number;
}

export interface LineItem{
    price_data?: PriceData
    quantity?: number;
}

interface PriceData{
    currency: string;
    product_data?: ProductData
    unit_amount?: number;
}

interface ProductData{
    name: string;
}
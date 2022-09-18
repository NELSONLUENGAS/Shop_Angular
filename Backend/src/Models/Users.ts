import { prop, getModelForClass, modelOptions, Ref , ReturnModelType, } from '@typegoose/typegoose';
import { Role } from './Roles';
import { Reviews } from './Reviews';
import { Orders } from './Orders';
import { Views } from './Views';
import { Cart } from './Cart';
import { PurchaseHistory } from './PurchaseHistory';


@modelOptions({
    schemaOptions: {
        versionKey: false,
        timestamps: true
    }
})
export class User{
    @prop({ 
        required: true,
    })
    public firstname : string 

    @prop()
    public lastname : string

    @prop({
        required: true,
        trim: true
    })
    public email : string 

    @prop({
        minlength: 6
    })
    public password : string

    @prop()
    public age : number

    @prop()
    public address : string

    @prop({
        required: true,
        default: 'local'
    })
    public provider : string

    @prop()
    public avatar : string

    @prop({
        required: true,
        default: true
    })
    public enable : boolean

    @prop({
        required: true,
        default: false
    })
    public login : boolean
    
    @prop({
        ref: 'Role',
        default: '62c7290abc216df97fa8725f'
    })
    public roles : Ref<Role>[]

    @prop({
        ref: 'Reviews'
    })
    public reviews : Ref<Reviews>[]

    @prop({
        ref: 'Orders'
    })
    public orders : Ref<Orders>[]

    @prop({
        ref:  'Views'
    })
    public views : Ref<Views>[]

    @prop({
        ref: 'Cart'
    })
    public cart : Ref<Cart>[]

    @prop({
        ref: 'PurchaseHistory'
    })
    public purchaseHistory : Ref<PurchaseHistory>[]

    static async findOrCreate(this : ReturnModelType<typeof User>, value: object, dataDefault: object ){
        const userExist = await this.findOne(value);
        if(!userExist){
            const user = await this.create(dataDefault);
            return {
                created: true,
                data: user
            }
        }else{
            return{
                created: false
            }
        }
    }
}
export const UsersModel = getModelForClass(User);
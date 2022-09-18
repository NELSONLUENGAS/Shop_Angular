import { prop, getModelForClass, modelOptions, Severity, Ref, ReturnModelType } from '@typegoose/typegoose';
import { Cart } from './Cart';
import { Reviews } from './Reviews';
import { Views } from './Views';
import { QA } from './QuestionsAndAnswers';
import { Category } from './Categories';
import { Brand } from './Brand';


@modelOptions({
    schemaOptions: {
        versionKey: false,
        timestamps: true
    },
    options:{
        allowMixed: Severity.ALLOW,
    }
})
export class Products {
    @prop({
        // required: true,
        trim: true
    })
    public name : string

    @prop({
        // required: true,
        min: 0
    })
    public STOCK : number

    @prop({
        // required: true
    })
    public price : number

    @prop({
        lowercase: true
    })
    public image : string

    @prop({
        // required: true,
        type: Object
    })
    public description : object
    
    @prop({
        required: true,
        default: true
    })
    public enable : boolean

    @prop({
        ref: 'Cart'
    })
    public userCartID : Ref<Cart>[]

    @prop({
        ref: 'Reviews'
    })
    public reviewID : Ref<Reviews>[]

    @prop({
        ref: 'Views'
    })
    public viewID : Ref<Views>[]

    @prop({
        ref: 'QA'
    })
    public QAID : Ref<QA>[]

    @prop({
        ref: 'Brand'
    })
    public brandID : Ref<Brand>

    @prop({
        ref: 'Category'
    })
    public categoryID : Ref<Category>

    static async findOrCreate(this : ReturnModelType<typeof Products>, value: object, dataDefault: object ){
        const productExist = await this.findOne(value);
        if(!productExist){
            const product = await this.create(dataDefault);
            return {
                created: true,
                data: product
            }
        }else{
            return{
                created: false
            }
        }
    }
}

export const ProductModel = getModelForClass(Products);
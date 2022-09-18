import { prop, getModelForClass, modelOptions, ReturnModelType, Ref } from '@typegoose/typegoose';
import { Brand } from './Brand';

@modelOptions({
    schemaOptions: {
        versionKey: false,
        timestamps: true
    }
})
export class Category {
    @prop({
        required: true
    })
    public name : string
    
    @prop({
        required: true,
        default: true
    })
    public enable : boolean

    @prop()
    public icon : string

    @prop({
        required: true,
        ref: () => Brand
    })
    public brandID : Ref<Brand>[]

    static async findOrCreate(this : ReturnModelType<typeof Category>, value: object, dataDefault: object ){
        const categoryExist = await this.findOne(value);
        if(!categoryExist){
            const category = await this.create(dataDefault);
            return {
                created: true,
                data: category
            }
        }else{
            return{
                created: false
            }
        }
    }
}

export const CategoryModel = getModelForClass(Category);
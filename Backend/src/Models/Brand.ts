import { prop, getModelForClass, modelOptions, ReturnModelType } from '@typegoose/typegoose';


@modelOptions({
    schemaOptions: {
        versionKey: false,
        timestamps: true
    }
})
export class Brand {
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

    static async findOrCreate(this : ReturnModelType<typeof Brand>, value: object, dataDefault: object ){
        const BrandExist = await this.findOne(value);
        if(!BrandExist){
            const Brand = await this.create(dataDefault);
            return {
                created: true,
                data: Brand
            }
        }else{
            return{
                created: false
            }
        }
    }
}

export const BrandModel = getModelForClass(Brand);
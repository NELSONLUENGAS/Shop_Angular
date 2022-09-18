import { prop, getModelForClass, modelOptions, ReturnModelType } from '@typegoose/typegoose';


@modelOptions({
    schemaOptions: {
        versionKey: false,
        timestamps: true
    }
})
export class Role {
    @prop()
    public name : string
    
    @prop({
        required: true,
        default: true
    })
    public enable : boolean

    static async findOrCreate(this : ReturnModelType<typeof Role>, value: object, dataDefault: object ){
        const RoleExist = await this.findOne(value);
        if(!RoleExist){
            const Role = await this.create(dataDefault);
            return {
                created: true,
                data: Role
            }
        }else{
            return{
                created: false
            }
        }
    }
}

export const RoleModel = getModelForClass(Role);
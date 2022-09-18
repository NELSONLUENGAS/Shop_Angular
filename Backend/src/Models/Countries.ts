import { prop, getModelForClass, modelOptions, plugin, defaultClasses, Severity } from '@typegoose/typegoose';
const findorcreate = require('mongoose-findorcreate');

@modelOptions({
    schemaOptions: {
        versionKey: false,
        timestamps: true
    },
    options:{
        allowMixed: Severity.ALLOW,
    }
})

@plugin(findorcreate)

export class Countries extends defaultClasses.FindOrCreate {
    @prop({
        required: true
    })
    public name : string
    
    @prop({
        required: true
    })
    public iso3 : string

    @prop()
    public flag ?: string

    @prop({
        required: true
    })
    public cities : string[]

}

export const CountriesModel = getModelForClass(Countries);
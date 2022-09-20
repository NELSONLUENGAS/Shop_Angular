import { Schema, model } from 'mongoose';
import { ICountry, ICountryStatic } from '../Interface/Country.interface';
import { findOrCreate } from '../Helpers/StaticMethod';

const CountrySchema = new Schema<ICountry, ICountryStatic>({
    name: { 
        type: String, 
        required: false 
    },
    iso3: { 
        type: String, 
        required: true 
    },
    flag: String,
    cities: { 
        type: [String], 
        required: false 
    },
},
{ 
    timestamps: true 
});

CountrySchema.static('findOrCreate', findOrCreate);
export const CountryModel = model<ICountry, ICountryStatic>('Country', CountrySchema);
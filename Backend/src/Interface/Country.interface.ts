import { HydratedDocument, Model } from "mongoose";

export interface ICountry {
    name?: string;
    iso3?: string;
    flag?: string;
    cities?: string[]
}

export interface ICountryStatic extends Model<ICountry> {
    findOrCreate(condition: any, doc: any): Promise<HydratedDocument<ICountry>>;
}

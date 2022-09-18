import { CountriesModel } from "../Models/Countries"
import axios from 'axios';

export const loadCountries = async ()=> {
    const countriesImages = await axios('https://countriesnow.space/api/v0.1/countries/flag/images');
    const countriesDetails = await axios('https://countriesnow.space/api/v0.1/countries');

    for(let country of countriesDetails.data.data){
        await CountriesModel.findOrCreate(
            {
                name: country.country
            },
            {
                iso3: country.iso3,
                cities: country.cities
            }
        )
    }

    for(let country of countriesImages.data.data){
        await CountriesModel.findOneAndUpdate({name: country.name},{flag: country.flag});
    }
}
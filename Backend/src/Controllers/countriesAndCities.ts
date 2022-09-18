import { NextFunction, Request, Response } from "express";
import { CountriesModel } from "../Models/Countries";

export const getCountries = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const countries  = await CountriesModel.find();
        console.log(req.body)
        if(countries.length){
            res.send(countries);
        }else{
            res.send('countriesModel are empty')
        }
    }catch(error){
        next(error);
    }
}
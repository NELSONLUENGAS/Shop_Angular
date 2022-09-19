import { Request , Response } from 'express';
import { BrandModel } from '../Models/Brand';


export const createBrand = async ( req : Request, res : Response) => {
    try{
        const { brand } = req.body
        if(brand){
            const newBrand = await BrandModel.findOrCreate({name: brand.name}, brand);
            res.send({ data: newBrand });
        }else{
            res.send({ msg: 'brand is required'});
        }
    }catch(error){
        console.log(error);  
    }
};

export const getBrands = async ( req : Request, res : Response) => {
    try{
        const { brandName } = req.query;
        if(brandName){
            const brand = await BrandModel.find({ name: brandName });
            if(brand.length){
                res.send({ data: brand });
            }else{
                res.send({ msg: 'brand is not exist'})
            }
            return;  
        }
        const brands = await BrandModel.find();
        if(brands.length){
            res.send({ data: brands })
        }else{
            res.send({ msg: 'brands are empty'})
        }
    }catch(error){
        console.log(error);
    }
};

export const getBrandById = async ( req : Request, res : Response) => {
    try{
        const { id } = req.params;
        if(id){
            const brandId = await BrandModel.findById(id);
            if(brandId){
                const brand = await BrandModel.findById(id);
                res.send({ data: brand });
            }else{
                res.send({msg: 'Id not exist'});
            }
        }else{
            res.send({msg: 'Id is required'})
        }
    }catch(error){
        console.log(error);
    }
};


export const updateBrandById = async ( req : Request, res : Response) => {
    try{
        const fileName = req.file?.filename;
        const basePath = `${req.protocol}://${req.get('host')}/Public/Upload/${fileName}`
        const { id } = req.params;
        const { name } = req.body;  
        if(id){
            const brand = await BrandModel.findByIdAndUpdate(id,{name: name, icon: basePath} );
            if(brand){
                res.send({ data: brand });
            }else{
                res.send({msg: 'Id not exist'});
            }
        }else{
            res.send({msg: 'Id is required'})
        }
    }catch(error){
        console.log(error);
    }
};

export const enableBrandById = async ( req : Request, res : Response) => {
    try{
        const { id } = req.params;
        if(id){
            const brandId = await BrandModel.findById(id);
            if(brandId){
                const brand = await BrandModel.findByIdAndUpdate(id,{enable: !brandId?.enable } );
                res.send({ data: brand });
            }else{
                res.send({msg: 'Id not exist'});
            }
        }else{
            res.send({msg: 'Id is required'})
        }
    }catch(error){
        console.log(error);
    }
};

export const deleteBrandById = async ( req : Request, res : Response) => {
    try{
        const { id } = req.params;
        if(id){
            const brand = await BrandModel.findByIdAndDelete(id);
            if(brand){
                res.send({ data: brand });
            }else{
                res.send({msg: 'Id not exist'});
            }
        }else{
            res.send({msg: 'Id is required'})
        }
    }catch(error){
        console.log(error);
    }
};
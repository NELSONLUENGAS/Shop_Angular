import { Request , Response } from 'express';
import { CategoryModel } from '../Models/Categories';
import { BrandModel } from '../Models/Brand';

export const createCategory = async ( req : Request, res : Response) => {
    try{
        const { category, brandID } = req.body
        if(category){
            const newCategory = await CategoryModel.findOrCreate({name: category.name}, category);
            console.log(newCategory)
            const categoryCreated = await CategoryModel.find().where({name: category.name})
            if(newCategory && categoryCreated && brandID?.length){
                const arrayBrandID = [];
                for(let brand of brandID){
                    const currentBrand = await BrandModel.find({name: brand});
                    arrayBrandID.push(currentBrand[0]?._id);
                }
                await CategoryModel.findOneAndUpdate({name: category.name},{brandID: arrayBrandID})
                res.send({msg: 'category and brandID created sucedssfully'})
            }else {
                res.send({ data: newCategory });
            }
        }else{
            res.send({ msg: 'Category is required' });
        }
    }catch(error){
        console.log(error);
    }
};

export const getCategories = async ( req : Request, res : Response) => {
    try{
        const { categoryName } = req.query;
        if(categoryName){
            const brand = await CategoryModel.find({ name: categoryName });
            if(brand.length){
                res.send({ data: brand });
            }else{
                res.send({ msg: 'brand is not exist'})
            }
            return;
        }
        const categories = await CategoryModel.find()
            .populate({
                path: 'brandID'
            });
        if(categories.length){
            res.send({ data: categories })
        }else{
            res.send({ msg: 'categories are empty'})
        }
    }catch(error){
        console.log(error);
    }
};

export const getCategoryById = async ( req : Request, res : Response) => {
    try{
        const { id } = req.params;
        if(id){
            const category = await CategoryModel.findById(id)
            .populate({
                path: 'brandID'
            });
            if(category){
                res.send({ data: category });
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

export const updateCategoryById = async ( req : Request, res : Response) => {
    try{
        const { id } = req.params;
        const { category, brandID } = req.body; 
        const fileName = req.file?.filename;
        const basePath = `https://${req.get('host')}/public/upload/${fileName}`
        if(id){
            await CategoryModel.findByIdAndUpdate(id,{name: category?.name, icon: basePath} );
            if(brandID?.length){
                const arrayBrandID = [];
                for(let brand of brandID){
                    const currentBrand = await BrandModel.find({name: brand});
                    arrayBrandID.push(currentBrand[0]?._id);
                }
                await CategoryModel.findByIdAndUpdate(id,{brandID: arrayBrandID, icon: basePath})
            }
            const currentCategory = await CategoryModel.findById(id)
            if(currentCategory){
                res.send({ data: currentCategory });
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

export const enableCategoryById = async ( req : Request, res : Response) => {
    try{
        const { id } = req.params;
        if(id){
            const categoryId = await CategoryModel.findById(id);
            if(categoryId){
                const category = await CategoryModel.findByIdAndUpdate(id,{enable: !categoryId?.enable });
                res.send({ data: category });
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

export const deleteCategoryById = async ( req : Request, res : Response) => {
    try{
        const { id } = req.params;
        if(id){
            const category = await CategoryModel.findByIdAndDelete(id);
            if(category){
                res.send({ data: category });
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

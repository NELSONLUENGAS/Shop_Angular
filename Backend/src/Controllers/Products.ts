import { Request , Response } from 'express';
import { ProductModel } from '../Models/Products';

export const createProduct = async ( req : Request, res : Response) => {
    try{
        const fileName = req.file?.filename;
        const basePath = `${req.protocol}://${req.get('host')}/Public/Upload/${fileName}`
        if(req.body){
            const newProduct = await ProductModel.findOrCreate({name: req.body?.name}, {
                name: req.body?.name,
                STOCK: req.body?.stock,
                price: req.body?.price,
                image: basePath,
                description: req.body?.description,
                brandID: req.body?.brand,
                categoryID: req.body?.category
            });
            if(newProduct.created){
                res.send({data: newProduct});
            }else{
                res.send({msg: 'Existing product'});
            }
        }else{
            res.send({msg: 'New Product is required'});
        }
    }catch(error){
        console.log(error);
    }
}
export const getProducts = async ( req : Request, res : Response) => {
    try{
        const {categories} = req.query;
        if(typeof categories === 'string'){
            let productsFilter: any[] = [];
            for(let category of categories.split(',')){
                const products = await ProductModel.find({categoryID: category})
                .populate({
                    path: 'brandID categoryID'
                });
                productsFilter = [...productsFilter, ...products]
            }
            if(productsFilter.length){
                res.send({data: productsFilter});
            }else{
                res.send({msg: 'Products doesnt exist'});
            }
        }else{
            const allProducts = await ProductModel.find()
            .populate({
                path: 'brandID categoryID'
            });
            if(allProducts.length){
                res.send({data: allProducts});
            }else{
                res.send({msg: 'Products are empty'});
            }
        }
    }catch(error){
        console.log(error);
    }
}
export const getProductById = async ( req : Request, res : Response) => {
    try{
        const { id } = req.params;
        if(id){
            const productById = await ProductModel.findById(id)
            .populate({
                path: 'brandID categoryID'
            });
            if(productById){
                res.send({data: productById});
            }else{
                res.send({msg: 'Product doesnt exist'});
            }
        }else{
            res.send({msg: 'Id is required'});
        }
    }catch(error){
        console.log(error);
    }
}
export const updateProductById = async ( req : Request, res : Response) => {
    try{
        const { id } = req.params;
        const fileName = req.file?.filename;
        const basePath = `${req.protocol}://${req.get('host')}/Public/Upload/${fileName}`
        if(fileName){
            // console.log(basePath)
            await ProductModel.findByIdAndUpdate(id, {
                image: basePath
            })
        }
        if(req.body){
            const currentProduct = await ProductModel.findByIdAndUpdate(id, {
                name: req.body?.name,
                STOCK: req.body?.stock,
                price: req.body?.price,
                description: req.body?.description,
                brandID: req.body?.brand,
                categoryID: req.body?.category,
                image: basePath
            });
            // console.log(currentProduct)
            res.send({data: currentProduct});
        }else{
            res.send({msg: 'Product is required'});
        }
    }catch(error){
        console.log(error);
    }
}
export const updateProductStockById = async ( req : Request, res : Response) => {
    try{
        const { Stock } = req.body;
        const { id } = req.params;
        if(Stock){
            const currentProduct = await ProductModel.findByIdAndUpdate(id, {STOCK: Stock });
            res.send({data: currentProduct});
        }else{
            res.send({msg: 'Product is required'});
        }
    }catch(error){
        console.log(error);
    }
}
export const enableProductById = async ( req : Request, res : Response) => {
    try{
        const { id } = req.params;
        if(id){
            const productId = await ProductModel.findById(id);
            if(productId){
                const product = await ProductModel.findByIdAndUpdate(id,{enable: !productId?.enable });
                res.send({ data: product });
            }else{
                res.send({msg: 'Id not exist'});
            }
        }else{
            res.send({msg: 'Id is required'})
        }
    }catch(error){
        console.log(error);
    }
}
export const deleteProductById = async ( req : Request, res : Response) => {
    try{
        const { id } = req.params;
        if(id){
            const product = await ProductModel.findByIdAndDelete(id);
            if(product){
                res.send({ data: product });
            }else{
                res.send({msg: 'Id not exist'});
            }
        }else{
            res.send({msg: 'Id is required'})
        }
    }catch(error){
        console.log(error);
    }
}
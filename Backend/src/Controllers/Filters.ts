import { Request, Response } from 'express';
import { ProductModel } from '../Models/Products';
import { BrandModel } from '../Models/Brand';
import { CategoryModel } from '../Models/Categories';

export const filterProductsBy = async (req : Request, res : Response ) => {
    try{
        const { brandName, categoryName,  greaterThan, lessThan} = req.query;
        const brandId = await BrandModel.findOne({name: brandName});
        const categoryId = await CategoryModel.findOne({name: categoryName});
        if(brandName && categoryName && greaterThan && lessThan){
            const productFilter = await ProductModel.find()
                .where({enable: true})
                .where('brandID').equals(brandId?._id)
                .where('categoryID').equals(categoryId?._id)
                .where('price').gte(Number(greaterThan)).lte(Number(lessThan))
            if(productFilter.length){
                for(let product of productFilter){
                    await product.populate('brandID categoryID');
                }
                res.send({data: productFilter});
            }else{
                res.send({msg: 'Incorrect filed'})
            } 
        }else if(brandName && greaterThan && lessThan){
            const productFilter = await ProductModel.find()
                .where({enable: true})
                .where('brandID').equals(brandId?._id)
                .where('price').gte(Number(greaterThan)).lte(Number(lessThan))
            if(productFilter.length){
                for(let product of productFilter){
                    await product.populate('brandID categoryID');
                }
                res.send({data: productFilter});
            }else{
                res.send({msg: 'Incorrect filed'})
            }  
        }else if(categoryName && greaterThan && lessThan){
            const productFilter = await ProductModel.find()
                .where({enable: true})
                .where('categoryID').equals(categoryId?._id)
                .where('price').gte(Number(greaterThan)).lte(Number(lessThan))
            if(productFilter.length){
                for(let product of productFilter){
                    await product.populate('brandID categoryID');
                }
                res.send({data: productFilter});
            }else{
                res.send({msg: 'Incorrect filed'})
            } 
        }else if(brandName && greaterThan ){
            const productFilter = await ProductModel.find()
                .where({enable: true})
                .where('brandID').equals(brandId?._id)
                .where('price').gte(Number(greaterThan))
            if(productFilter.length){
                for(let product of productFilter){
                    await product.populate('brandID categoryID');
                }
                res.send({data: productFilter});
            }else{
                res.send({msg: 'Incorrect filed'})
            } 
        }else if(brandName && lessThan){
            const productFilter = await ProductModel.find()
                .where({enable: true})
                .where('brandID').equals(brandId?._id)
                .where('price').lte(Number(lessThan))
            if(productFilter.length){
                for(let product of productFilter){
                    await product.populate('brandID categoryID');
                }
                res.send({data: productFilter});
            }else{
                res.send({msg: 'Incorrect filed'})
            } 
        }else if(categoryName && greaterThan && lessThan){
            const productFilter = await ProductModel.find()
                .where({enable: true})
                .where('categoryID').equals(categoryId?._id)
                .where('price').gte(Number(greaterThan)).lte(Number(lessThan))
            if(productFilter.length){
                for(let product of productFilter){
                    await product.populate('brandID categoryID');
                }
                res.send({data: productFilter});
            }else{
                res.send({msg: 'Incorrect filed'})
            } 
        }else if(greaterThan && lessThan){
            const productFilter = await ProductModel.find()
                .where({enable: true})
                .where('price').gte(Number(greaterThan)).lte(Number(lessThan))
            if(productFilter.length){
                for(let product of productFilter){
                    await product.populate('brandID categoryID');
                }
                res.send({data: productFilter});
            }else{
                res.send({msg: 'Incorrect filed'})
            } 
        }else if(brandName){
            const productFilter = await ProductModel.find()
                .where({enable: true})
                .where('brandID').equals(brandId?._id)
            if(productFilter.length){
                for(let product of productFilter){
                    await product.populate('brandID categoryID');
                }
                res.send({data: productFilter});
            }else{
                res.send({msg: 'Incorrect filed'})
            }  
        }else if(categoryName){
            const productFilter = await ProductModel.find()
                .where({enable: true})
                .where('categoryID').equals(categoryId?._id)
            if(productFilter.length){
                for(let product of productFilter){
                    await product.populate('brandID categoryID');
                }
                res.send({data: productFilter});
            }else{
                res.send({msg: 'Incorrect filed'})
            }  
        }else if(lessThan){
            const productFilter = await ProductModel.find()
                .where({enable: true})
                .where('price').lte(Number(lessThan))
            if(productFilter.length){
                for(let product of productFilter){
                    await product.populate('brandID categoryID');
                }
                res.send({data: productFilter});
            } 
        }else if(greaterThan){
            const productFilter = await ProductModel.find()
                .where({enable: true})
                .where('price').gte(Number(greaterThan))
            if(productFilter.length){
                for(let product of productFilter){
                    await product.populate('brandID categoryID');
                }
                res.send({data: productFilter});
            }else{
                res.send({msg: 'Incorrect filed'})
            }  
        }else{
            res.send({msg: 'Filter filed is required'})
        }
    }catch(error){
        console.log(error);
    }
}
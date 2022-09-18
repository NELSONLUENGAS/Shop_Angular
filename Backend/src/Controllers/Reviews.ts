import { Request , Response } from 'express';
import { ReviewsModel } from '../Models/Reviews';

export const createReview = async ( req : Request, res : Response) => {
    try{
        const { review } = req.body;
        if(review){
            const newOrder = await ReviewsModel.create(review);
            if(newOrder){
                res.send({data: newOrder});
            }else{
                res.send({msg: 'Existing order'});
            }
        }else{
            res.send({msg: 'Order is required'});
        }
    }catch(error){
        console.log(error);
    }
}
export const getReviewsByProduct = async ( req : Request, res : Response) => {
    try{
        const { productId } = req.query;
        if(productId){
            const reviewsByProduct = await ReviewsModel.find({productID: productId});
            if(reviewsByProduct.length){
                res.send({data: reviewsByProduct})
            }else{
                res.send({msg: 'Incorrect Id'})
            }
        }else{
            res.send({msg: 'ProductId is required'});
        }
    }catch(error){
        console.log(error);
    }
}
export const updateReviewById = async ( req : Request, res : Response) => {
    try{
        const { review } = req.body;
        const { id } = req.params;
        if(review){
            const currentReview = await ReviewsModel.findByIdAndUpdate(id, review);
            res.send({data: currentReview});
        }else{
            res.send({msg: 'Review is required'});
        }
    }catch(error){
        console.log(error);
    }
}
export const deleteReviewById = async ( req : Request, res : Response) => {
    try{
        const { id } = req.params;
        if(id){
            const review = await ReviewsModel.findByIdAndDelete(id);
            if(review){
                res.send({ data: review });
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
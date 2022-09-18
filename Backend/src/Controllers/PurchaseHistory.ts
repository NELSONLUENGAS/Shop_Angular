import { Request , Response } from 'express';
import { PurchaseHistoryModel } from '../Models/PurchaseHistory';

export const createPurchase = async ( req : Request, res : Response) => {
    try{
        const { userID, orderID } = req.body;
        const userExist = await PurchaseHistoryModel.findOne({userID: userID});
        if(userID && orderID){
            if(userExist){
                await PurchaseHistoryModel.insertMany({orderID: orderID});
                res.send({msg: 'PurchaseHistory updated correctly'});
            }else{
                await PurchaseHistoryModel.insertMany({userID: userID, orderID: orderID});
                res.send({msg: 'PurchaseHistory created correctly'});
            }
        }else{
            res.send({msg: 'userID and orderID is required'});
        }
    }catch(error){
        console.log(error);
    }
}
export const getPurchases = async (req : Request, res : Response) => {
    const any = req.params;
    console.log(any);
    try{
        const allPurchase = await PurchaseHistoryModel.find()
        if(allPurchase.length){
            for(let purchase of allPurchase){
                await purchase.populate('userID ordersID');
            }
            res.send({data: allPurchase});
        }else{
            res.send({msg: 'PurchaseHistory is empty'});
        }
    }catch(error){
        console.log(error);
    }
}
export const getPurchaseByUser = async ( req : Request, res : Response) => {
    try{
        const { userID } = req.params;
        if(userID){
            const currentUser = await PurchaseHistoryModel.findById(userID);
            if(currentUser){
                await currentUser.populate('userID ordersID');
                res.send({data: currentUser});
            }else{
                res.send({msg: 'User doesnt exist'});
            }
        }else{
            res.send({msg: 'userID is required'});
        }
    }catch(error){
        console.log(error);
    }
}


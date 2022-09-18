import { Request , Response } from 'express';
import { LineItem, OrderItem, OrdersModel } from '../Models/Orders';
import { UsersModel } from '../Models/Users';
import { ProductModel } from '../Models/Products';
import { Stripe } from 'stripe';

// const STRIPE_SECRET_KEY: string  = process.env.STRIPE_SECRET_KEY as string;
const STRIPE_SECRET_KEY: string  = 'sk_test_51Lige1Cp3tieVWcOhRcUhoMZU71rkblZpNHzPhUPeYuhkEbCbwnYuuIqTgfGK7kKFhuialfkmcwvRmCuoZyOfuF500XcBEUojL';
const stripe =  new Stripe(STRIPE_SECRET_KEY, {apiVersion: '2022-08-01', typescript: true});


export const PostSessionCheckout = async (req: Request, res: Response) => {
    try{
        const orderItems  = req.body;
        if(!orderItems?.length){
            res.send('Order Items is required');
        }else{
            const line_items: LineItem[] = await Promise.all(
                orderItems.map(async (orderItem: OrderItem) => {
                    const product = await ProductModel.findById(orderItem.productId);
                    if(product){
                        let unit_amount_decimal =( product.price / 4428) * 100;
                        return {
                            price_data:{
                                currency: 'usd',
                                product_data: {
                                    name: product.name
                                },
                                unit_amount_decimal: unit_amount_decimal.toFixed().toString(),
                            },
                            quantity: orderItem.quantity
                        }
                    }
                    return;
                })
            );
    
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                success_url: 'http://localhost:4200/success',
                cancel_url: 'http://localhost:4200',
                mode: 'payment',
                line_items: line_items
            })
            res.send({id: session.id});
        }
    }catch(error){
        console.log(error)
    }
}
export const createOrder = async ( req : Request, res : Response) => {
    try{
        if(req.body){
            const newOrder = await OrdersModel.create(req.body);
            if(newOrder){
                res.send(newOrder);
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
export const getOrders = async ( req : Request, res : Response) => {
    try{
        const { name } = req.query;
        if(name){
            console.log(name);
        }
        const orders = await OrdersModel.find()
            .populate({
                path: 'userID'
            })
            // for(let user of users){
            //     user.roles.length && await user.populate('roles');
            //     user.orders.length && await user.populate('orders');
            //     user.views.length && await user.populate('views');
            //     user.reviews.length && await user.populate('reviews');
            //     user.cart.length && await user.populate('cart');
            //     user.purchaseHistory.length && await user.populate('purchaseHistory');
            // } 
            if(orders.length){
                res.send(orders);
            }else{
                res.send({msg: 'Orders are empty'});
            } 
    }catch(error){
        console.log(error);
    }
}
export const getOrdersByUser = async ( req : Request, res : Response) => {
    try{
        const { user } = req.query;
        if(user){
            const existingUser = await UsersModel.findOne({name: user});
            if(existingUser){
                const orders = await OrdersModel.find({userID: existingUser?._id});
                    // for(let user of users){
                    //     user.roles.length && await user.populate('roles');
                    //     user.orders.length && await user.populate('orders');
                    //     user.views.length && await user.populate('views');
                    //     user.reviews.length && await user.populate('reviews');
                    //     user.cart.length && await user.populate('cart');
                    //     user.purchaseHistory.length && await user.populate('purchaseHistory');
                    // } 
                    if(orders.length){
                        res.send({data: orders});
                    }else{
                        res.send({msg: 'Orders are empty or ID doesnt match'});
                    } 
            }else{
                res.send({msg: 'User doesnt exist'})
            }
        }else{
            res.send({msg: 'User is required'});
        }
    }catch(error){
        console.log(error);
    }
}
export const updateOrderStatusById = async ( req : Request, res : Response) => {
    try{
        const { status } = req.body;
        const { id } = req.params;
        if(status){
            const currentOrder = await OrdersModel.findByIdAndUpdate(id, {status: status});
            res.send({data: currentOrder});
        }else{
            res.send({msg: 'Status order is required'});
        }
    }catch(error){
        console.log(error);
    }
}
export const deleteOrderById = async ( req : Request, res : Response) => {
    try{
        const { id } = req.params;
        if(id){
            const order = await OrdersModel.findByIdAndDelete(id);
            if(order){
                res.send({ data: order });
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
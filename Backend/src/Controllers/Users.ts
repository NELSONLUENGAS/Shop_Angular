import { Request , Response } from 'express';
import { UsersModel } from '../Models/Users';
import bcrypt, { genSaltSync } from 'bcryptjs';

export const createUser = async ( req : Request, res : Response) => {
    try{
        if(req.body){
            const newUser = await UsersModel.findOrCreate({email: req.body.email}, 
                {
                    firstname: req.body?.firstname,
                    lastname: req.body?.lastname,
                    email: req.body?.email,
                    password: bcrypt.hashSync(req.body?.password, genSaltSync(16)) ,
                    age: req.body?.age,
                    address: req.body?.address,
                    roles: req.body?.roles
                })
            if(newUser?.created){
                res.send({data: newUser});
            }else{
                res.send({msg: 'Existing user'});
            }
        }else{
            res.send({msg: 'User is required'});
        }
    }catch(error){
        console.log(error);
    }
}
export const getUsers = async ( req : Request, res : Response) => {
    try{
        const { userName } = req.query;
        if(userName){
            const uniqueUser = await UsersModel.findOne({firtsname: userName})
            if(uniqueUser){
                uniqueUser.roles.length && await uniqueUser.populate('roles');
                uniqueUser.orders.length && await uniqueUser.populate('orders');
                uniqueUser.views.length && await uniqueUser.populate('views');
                uniqueUser.reviews.length && await uniqueUser.populate('reviews');
                uniqueUser.cart.length && await uniqueUser.populate('cart');
                uniqueUser.purchaseHistory.length && await uniqueUser.populate('purchaseHistory');
                res.send({data: uniqueUser});
            }else{
                res.send({msg: 'User doesnt exist'});
            }
        }else{
            const users = await UsersModel.find()
                .select('-password')
            if(users.length){
                for(let user of users){
                    user.roles.length && await user.populate('roles');
                    user.orders.length && await user.populate('orders');
                    user.views.length && await user.populate('views');
                    user.reviews.length && await user.populate('reviews');
                    user.cart.length && await user.populate('cart');
                    user.purchaseHistory.length && await user.populate('purchaseHistory');
                } 
                res.send({data: users});
            }else{
                res.send({msg: 'Users are empty'});
            } 
        }
    }catch(error){
        console.log(error);
    }
}
export const getUserById = async ( req : Request, res : Response) => {
    try{
        const { id } = req.params;
        if(id){
            const userById = await UsersModel.findById(id)
            .select('-password')
            if(userById){
                userById.roles.length && await userById.populate('roles');
                userById.orders.length && await userById.populate('orders');
                userById.views.length && await userById.populate('views');
                userById.reviews.length && await userById.populate('reviews');
                userById.cart.length && await userById.populate('cart');
                userById.purchaseHistory.length && await userById.populate('purchaseHistory');
                res.send({data: userById});
            }else{
                res.send({msg: 'User doesnt exist'});
            }
        }else{
            res.send({msg: 'Id is required'});
        }
    }catch(error){
        console.log(error);
    }
}
export const updateUserById = async ( req : Request, res : Response) => {
    try{
        const { id } = req.params;
        const filename = req.file?.filename;
        const basePath = `${req.protocol}://${req.get('host')}/Public/Upload/${filename}`
        if(req.body){
            if(basePath){
                await UsersModel.findByIdAndUpdate(id,{
                    avatar: basePath
                })
            };
            const currentUser = await UsersModel.findByIdAndUpdate(id, {
                firstname: req.body?.firstname,
                lastname: req.body?.lastname,
                age: req.body?.age,
                address: req.body?.address,
                password: bcrypt.hashSync(req.body?.password, genSaltSync(16)) ,
                roles: req.body?.roles,
            })
            .select('-password');
            res.send({data: currentUser});
        }else{
            res.send({msg: 'User is required'});
        }
    }catch(error){
        console.log(error);
    }
}
export const updateUserRolById = async ( req : Request, res : Response) => {
    try{
        const { id } = req.params;
        if(req.body){
            const currentUser = await UsersModel.findByIdAndUpdate(id, {
                roles: req.body.roles
            })
            .select('-password');
            res.send({data: currentUser});
        }else{
            res.send({msg: 'User is required'});
        }
    }catch(error){
        console.log(error);
    }
}
export const enableUserById = async ( req : Request, res : Response) => {
    try{
        const { id } = req.params;
        if(id){
            const userId = await UsersModel.findById(id);
            if(userId){
                const user = await UsersModel.findByIdAndUpdate(id,{enable: !userId?.enable })
                .select('-password');
                res.send({ data: user });
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
export const deleteUserById = async ( req : Request, res : Response) => {
    try{
        const { id } = req.params;
        if(id){
            const user = await UsersModel.findByIdAndDelete(id)
            .select('-password');
            if(user){
                res.send({ data: user });
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
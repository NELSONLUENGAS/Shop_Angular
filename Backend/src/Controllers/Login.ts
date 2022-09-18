import { Request, Response } from "express";
import { UsersModel } from "../Models/Users";
import { RoleModel } from "../Models/Roles";
import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';


export const Login = async (req: Request, res: Response)=> {
    const SECRET = process.env['SECRET'] as Secret;
    try{
        if(req.body){
            const UserExist = await UsersModel.findOne({ email: req.body?.email });
            if(!UserExist){
                res.send({msg: "You don't have an account, Please register"});
            }else{
                if(UserExist && bcrypt.compareSync(req.body.password, UserExist.password)){
                    let isAdmin;
                    for(let role of UserExist?.roles){
                        const roleName = await RoleModel.findById(role);
                        if(roleName?.name === 'superAdmin' || roleName?.name === 'admin'){
                            isAdmin = true;
                        }else{
                            isAdmin = false;
                        }
                    }
                    await UsersModel.findByIdAndUpdate(UserExist._id,{
                        login: true
                    })
                    const token: string = jwt.sign({
                        userId: UserExist._id,
                        isAdmin: isAdmin,
                    }, SECRET, { expiresIn: '1d' });
                    res.send({user: UserExist.email, token: token, name: UserExist.firstname});
                }else{
                    res.send({msg: 'Password is wrong'});
                }
            }
        }
    }catch(error){
        console.log(error);
    }
}
import { Request , Response } from 'express';
import { RoleModel } from '../Models/Roles';


export const createRole = async (req : Request, res : Response ) => {
    try{
        const { role } =  req.body;
        if(role){
            const newRole = await RoleModel.findOrCreate({name: role.name}, role);
            if(newRole.created){
                res.send({data: newRole});
            }else{
                res.send({msg: 'Existing role'});
            }
        }else{
            res.send({msg: 'Role is required'});
        }
    }catch(error){
        console.log(error);
    }
}
export const getRoles = async (req : Request, res : Response ) => {
    try{
        const { roleName } = req.query;
        if(roleName){
            const existingRole = await RoleModel.find({name: roleName});
            if(existingRole){
                res.send({data: existingRole});
            }else{
                res.send({data: 'RoleName doesnt exist'});
            }
        }else{
            const roles = await RoleModel.find();
            if(roles.length){
                res.send({data: roles});
            }else{
                res.send({mag: 'Roles are empty'});
            }
        }
    }catch(error){
        console.log(error);
    }
}
export const updateRoleById = async (req : Request, res : Response ) => {
    try{
        const { role } = req.body;
        const { id } = req.params;
        if(role){
            const currentRole = await RoleModel.findByIdAndUpdate(id, role);
            res.send({data: currentRole});
        }else{
            res.send({msg: 'Role is required'});
        }
    }catch(error){
        console.log(error);
    }
}
export const enableRoleById = async (req : Request, res : Response ) => {
    try{
        const { id } = req.params;
        if(id){
            const RoleId = await RoleModel.findById(id);
            if(RoleId){
                const Role = await RoleModel.findByIdAndUpdate(id,{enable: !RoleId?.enable } );
                res.send({ data: Role });
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
export const deleteRoleById = async (req : Request, res : Response ) => {
    try{
        const { id } = req.params;
        if(id){
            const role = await RoleModel.findByIdAndDelete(id);
            if(role){
                res.send({ data: role });
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
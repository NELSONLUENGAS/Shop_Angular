import { model, Schema } from 'mongoose';
import { IRole, IRoleStatic } from '../Interface/Role.interface';
import { findOrCreate } from '../Helpers/StaticMethod';

const RoleSchema = new Schema<IRole, IRoleStatic>({
    name: { 
        type: String, 
        required: true 
    },
    enable: { 
        type: Boolean, 
        required: true, 
        default: true 
    },
    icon: String,
},
{ 
    timestamps: true 
});

RoleSchema.static('findOrCreate', findOrCreate);
export const RoleModel = model<IRole, IRoleStatic>('Role', RoleSchema);
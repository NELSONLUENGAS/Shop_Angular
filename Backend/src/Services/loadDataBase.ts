import { UserData } from '../Data/Users';
import { CategoriesData } from '../Data/Category';
import { BrandsData } from '../Data/Brand';
import { ProductsData } from '../Data/Products';
import { RolesData } from '../Data/Roles';
import { UserModel } from '../Models/Users';
import { CategoryModel } from '../Models/Categories';
import { BrandModel } from '../Models/Brand';
import { ProductModel } from '../Models/Products';
import { RoleModel } from '../Models/Roles';
import { OrdersData } from '../Data/Orders';
import { OrderModel } from '../Models/Orders';
import bcrypt, { genSaltSync } from 'bcryptjs';

export const loadDataBase = async() => {
    
    for(let role of RolesData){
        await RoleModel.findOrCreate({name: role.name}, role)
    }

    for(let brand of BrandsData){
        await BrandModel.findOrCreate({name: brand.name}, brand)
    }

    for(let category of CategoriesData){
        await CategoryModel.findOrCreate({name: category.name}, category)
    }

    for(let user of UserData){
        user.password = bcrypt.hashSync(user.password, genSaltSync(15))
        await UserModel.findOrCreate({email: user.email}, user)   
    }

    for(let product of ProductsData){
        await ProductModel.findOrCreate({name: product.name}, product)
    }

    for(let order of OrdersData){
        await OrderModel.findOrCreate({_id: order._id}, order);
    }
}

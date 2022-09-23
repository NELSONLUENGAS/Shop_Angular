import { brandModel } from "./Brand.interface";
export class Category {
    _id = '';
    name? : string;
    enable? : boolean;
    icon?: string;
    checked = 'false';
    brandID? : brandModel[];
}

interface CategoryBody{
    name: string;
}

export interface CategoriesResponse {
    data: Category[]
}
export interface CategoryResponse {
    data: Category
}
export interface BrandResponse {
    data: brandModel[]
}

export interface PostCategory{
    category: CategoryBody;
    brandID: string[];
}

export interface PostCategoryResponse{
    msg: string;
}
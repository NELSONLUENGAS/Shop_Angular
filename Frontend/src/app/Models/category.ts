import { brandModel } from "./brand";
export class Category {
    _id : string;
    name? : string;
    enable? : boolean;
    checked? : boolean;
    icon?: string;
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

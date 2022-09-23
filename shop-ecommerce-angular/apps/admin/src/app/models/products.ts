import { brandModel } from "./brand";
import { Category } from "./category";

export interface Products{
    _id?: string;
    name?: string;
    STOCK?: number;
    price?: number;
    image?: string;
    description?: description;
    enable?: boolean;
    brandID?: brandModel;
    categoryID?: Category;
    createdAt?: string; 
    updatedAt?: string; 
}

export interface description{
    pantalla?: string;
    camara?: string;
    resolucion?: string;
    sistema?: string;
    text?: string;
    bateria?: string;
    procesador?: string;
    ram?: string;
}
export interface productResponse{
    data: Products[];
} 

export interface postProduct{
    created: boolean;
    data: Products
}

export interface postProductResponse{
    data: postProduct;
    msg: string;
}

export interface deleteProductResponse{
    data: Products
}

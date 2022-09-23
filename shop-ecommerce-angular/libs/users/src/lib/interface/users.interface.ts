import { UsersEntity } from "../state/users.models";

export interface getUsers{
    login? : boolean;
    _id?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    age?: number;
    provider?: string;
    avatar?: string;
    enable?: boolean;
    roles?: role[];
    createdAt?: string;
    updatedAt?: string;
    // "reviews": [],
    // "orders": [],
    // "views": [],
    // "cart": [],
    // "purchaseHistory": []
}

interface role{
    _id: string;
    name: string;
    enable: boolean;
}

export interface getUsersResponse{
    data: getUsers[];
}

export interface enableUser{
    data: getUsers
}

export interface User{
    data: UsersEntity
}
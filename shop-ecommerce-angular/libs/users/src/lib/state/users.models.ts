/**
 * Interface for the 'Users' data
 */
export interface UsersEntity {
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
};

interface role{
  _id: string;
  name: string;
  enable: boolean;
}

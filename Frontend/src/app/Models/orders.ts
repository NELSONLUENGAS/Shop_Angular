export interface Order{
    _id?: string;
    orderItems?: OrderItem[];
    shippingAnddress1?: string;
    shippingAnddress2?: string;
    city?: string;
    zip?: string;
    country?: string;
    phone?: string;
    status?: string;
    totalPrice?: number;
    userID?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface OrderItem{
    productId: string;
    quantity: number;
}
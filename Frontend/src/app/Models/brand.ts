export class brandModel {
    _id : string;
    name? : string;
    enable? : boolean;
    checked? : boolean;
    icon?: string;
}

export interface brandOneResponse{
    data?: brandModel;
}

export interface brandResponseBody{
    data: postBrandResponse;
}

export interface postBrandResponse{
    created: boolean;
    data: brandModel;
}

export interface postBrand{
    brand: brandModel
}
export enum ProductTypes {
    A = "a",
    B = "b"
}

export interface CreateProductInputDto {
    type: ProductTypes;
    name: string;
    price: number;
}

export interface CreateProductOutputDto {
    id: string;
    type: ProductTypes;
    name: string;
    price: number;
}
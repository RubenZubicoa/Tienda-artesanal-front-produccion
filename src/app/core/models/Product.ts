import { Manufacturer } from "./Manufacturer";

export type Product = {
    uuid: string;
    manufacturerId: Manufacturer['uuid'];
    name: string;
    description?: string;
    price: number;
    stock: number;
    category: string;
    images: string[];
    manufacturer?: Manufacturer;
}

export type ProductDB = {
    _id?: string;
    manufacturerId: Manufacturer['uuid'];
    name: string;
    description?: string;
    price: number;
    stock: number;
    category: string;
    images: string[];
    createdAt: number;
    updatedAt?: number;
}

export const mapProductToProduct = (productDB: ProductDB): Product => {
    return {
        uuid: productDB._id ?? '',
        manufacturerId: productDB.manufacturerId,
        name: productDB.name,
        description: productDB.description,
        price: productDB.price,
        stock: productDB.stock,
        category: productDB.category,
        images: productDB.images,
    }
}

export function isProduct(product: unknown): product is Product {
    return typeof product === 'object' && product !== null && 'uuid' in product && 'name' in product && 'manufacturerId' in product && 'image' in product && 'price' in product;
}

export function isProductCart(product: unknown): product is ProductCart {
    return isProduct(product) && 'quantity' in product;
}

export type ProductCart = Product & {
    quantity: number;
}
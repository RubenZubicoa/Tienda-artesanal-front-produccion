import { Product } from "./Product";

export type ProductImage = {
    uuid: string;
    productId: Product['uuid'];
    images: string[];
}

export type ProductImageDB = {
    _id: string;
    productId: Product['uuid'];
    images: string[];
}

export type AddProductImage = {
    productId: Product['uuid'];
    images: File[];
}

export function mapProductImageToProductImage(productImageDB: ProductImageDB): ProductImage {
    return {
        uuid: productImageDB._id,
        productId: productImageDB.productId,
        images: productImageDB.images,
    }
}
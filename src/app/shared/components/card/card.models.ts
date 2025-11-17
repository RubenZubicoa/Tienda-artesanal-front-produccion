import { Product } from "../../../core/models/Product";

export type CardData = {
    title: string;
    subtitle: string;
    image: string;
    perfilImage: string;
    price?: number;
}

export function mapProductToCardData(product: Product): CardData {
    return {
        title: product.name,
        subtitle: product.manufacturerId,
        image: product.image,
        perfilImage: product.manufacturerId,
        price: product.price,
    }
}
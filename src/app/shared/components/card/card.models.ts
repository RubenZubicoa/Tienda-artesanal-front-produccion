import { Manufacturer } from '../../../core/models/Manufacturer';
import { Product, ProductCart } from '../../../core/models/Product';

export type CardData = {
  uuid: string;
  title: string;
  subtitle?: string;
  images: string[];
  perfilImage?: string;
  price?: number;
  quantity?: number;
  description?: string;
};

export function mapProductToCardData(product: Product): CardData {
  return {
    uuid: product.uuid,
    title: product.name,
    subtitle: product.manufacturer?.name,
    images: product.images,
    perfilImage: product.manufacturer?.image,
    price: product.price,
    description: product.description,
  };
}

export function mapManufacturerToCardData(
  manufacturer: Manufacturer
): CardData {
  return {
    uuid: manufacturer.uuid,
    title: manufacturer.name,
    subtitle: manufacturer.address,
    images: manufacturer.image ? [manufacturer.image] : [],
    description: manufacturer.description,
  };
}

export function mapProductCartToCardData(product: ProductCart): CardData {
  return {
    uuid: product.uuid,
    title: product.name,
    subtitle: product.manufacturer?.name,
    images: product.images,
    perfilImage: product.manufacturerId,
    price: product.price,
    quantity: product.quantity,
  };
}
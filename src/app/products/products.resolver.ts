import { ResolveFn } from "@angular/router";
import { PRODUCTS_LIST } from "../core/data/products";
import { Product } from "../core/models/Product";

export const productResolver: ResolveFn<Product | undefined> = (route, state) => {
    const id = route.params['id'];
    return PRODUCTS_LIST.find(product => product.uuid === id);
}
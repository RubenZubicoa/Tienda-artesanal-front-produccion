import { Product } from "../models/Product";
import { MANUFACTURERS_LIST } from "./manufacturers";

export const PRODUCTS_LIST: Product[] = [
    {
        uuid: '1',
        manufacturerId: '1',
        name: 'Miel milflores',
        price: 8,
        category: "",
        images: [],
        stock: 0,        
        description: 'Miel de abeja de la región de Milflores',
        manufacturer: MANUFACTURERS_LIST.find(manufacturer => manufacturer.uuid === '1'),
    },
]
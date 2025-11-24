import { Product } from "../models/Product";
import { MANUFACTURERS_LIST } from "./manufacturers";

export const PRODUCTS_LIST: Product[] = [
    {
        uuid: '1',
        manufacturerId: '1',
        name: 'Miel milflores',
        price: 8,
        image: 'https://picsum.photos/300/300',
        description: 'Miel de abeja de la región de Milflores',
        manufacturer: MANUFACTURERS_LIST.find(manufacturer => manufacturer.uuid === '1'),
    },
    {
        uuid: '2',
        manufacturerId: '2',
        name: 'Queso Ideazabal',
        price: 20.36,
        image: 'https://picsum.photos/300/300',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        manufacturer: MANUFACTURERS_LIST.find(manufacturer => manufacturer.uuid === '2'),
    },
    {
        uuid: '3',
        manufacturerId: '2',
        name: 'Queso Ideazabal',
        price: 20.36,
        image: 'https://picsum.photos/300/300',
        description: 'Queso de cabra de la región de Ideazabal',
        manufacturer: MANUFACTURERS_LIST.find(manufacturer => manufacturer.uuid === '2'),
    },
    {
        uuid: '4',
        manufacturerId: '2',
        name: 'Queso Ideazabal',
        price: 20.36,
        image: 'https://picsum.photos/300/300',
        description: 'Queso de cabra de la región de Ideazabal',
        manufacturer: MANUFACTURERS_LIST.find(manufacturer => manufacturer.uuid === '2'),
    }
]
import { Manufacturer } from "./Manufacturer";

export type Product = {
    uuid: string;
    name: string;
    manufacturerId: Manufacturer['uuid'];
    image: string;
    price: number;
    description?: string;
}
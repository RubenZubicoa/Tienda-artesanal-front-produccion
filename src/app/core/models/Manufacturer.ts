import { getLocationFromAddress } from "../../shared/utils/geocoder";
import { MapMarker } from "../../shared/components/map/map.models";

export type Manufacturer  = {
    uuid: string;
    name: string;
    phone: string;
    email: string;
    image?: string;
    latitude?: number;
    longitude?: number;
    address?: string;
    description?: string;
}

export type ManufacturerDB = {
    _id?: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    description?: string;
    website?: string;
    image?: string;
    // meetingPoints?: MeetingPoint[];
    createdAt: number;
    updatedAt?: number;
    isDeleted?: boolean;
}

export type ManufacturerWithLocation = Manufacturer & {
    marker: MapMarker;
}

export type ManufacturerFilters = {
    maxDistance?: number;
}

export type AddManufacturerDB = Omit<ManufacturerDB, '_id' | 'createdAt' | 'updatedAt' | 'isDeleted'>;
export type UpdateManufacturerDB = Omit<ManufacturerDB, '_id' | 'createdAt' | 'updatedAt' | 'isDeleted'>;

export const mapManufacturerToManufacturer = (manufacturerDB: ManufacturerDB): Manufacturer => {
    return {
        uuid: manufacturerDB._id ?? '',
        name: manufacturerDB.name,
        phone: manufacturerDB.phone,
        email: manufacturerDB.email,
        image: manufacturerDB.image,
        address: manufacturerDB.address,
        description: manufacturerDB.description,
    }
}
export type User = {
    uuid: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    manufacturerId?: string;
}

export type UserDB = {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    manufacturerId?: string;
    createdAt?: number;
    updatedAt?: number;
    isDeleted?: boolean;
}

export type UpdateUserDB = Omit<UserDB, '_id' | 'createdAt' | 'updatedAt' | 'isDeleted'>;

export function mapUserToUser(userDB: UserDB): User {
    return {
        uuid: userDB._id ?? '',
        name: userDB.name,
        email: userDB.email,
        password: userDB.password,
        manufacturerId: userDB.manufacturerId,
        phone: userDB.phone,
    }
}
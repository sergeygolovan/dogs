export default interface IPet {
    _id: string;
    name: string;
    registrationDate: string;
    customer: string;
    orders: string[];
    image?: string;
    rating?: number;
    breed?: string;
    feed?: string;
    character?: string;
    diseases?: string;
    comments?: string;
}

export type PetCreateData = Omit<IPet, "_id">;

export type PetUpdateData = Pick<IPet, "_id"> & Partial<Omit<IPet, "_id" | "customer" | "orders">>;
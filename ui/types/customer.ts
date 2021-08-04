export default interface ICustomer {
    _id: string;
    name: string;
    registrationDate: string;
    contacts: string;
    image?: string;
    rating?: number;
    discount?: number;
    address?: string;
    comments?: string;
    pets: string[];
    orders: string[];
}

export type CustomerCreateData = Omit<ICustomer, "_id" | "pets" | "orders">;

export type CustomerUpdateData = Pick<ICustomer, "_id"> & Partial<Omit<ICustomer, "_id" | "pets" | "orders">>;
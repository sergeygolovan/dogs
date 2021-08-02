export default interface ICustomer {
    _id: string;
    name: string;
    contacts: string;
    image?: string;
    rating?: number;
    discount?: number;
    address?: string;
    comments?: string;
}

export type CustomerCreateData = Omit<ICustomer, "_id">;

export type CustomerUpdateData = Pick<ICustomer, "_id"> & Partial<ICustomer>;
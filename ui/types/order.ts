export default interface IOrder {
    _id: string;
    status: number;
    createdAt?: Date;
    updatedAt?: Date;
    dateTimeFrom: string;
    dateTimeTo: string;
    rate: number;
    customer: string;
    pets: string[];
    discount?: number;
    deposit?: number;
    comments?: string;
}

export type OrderCreateData = Omit<IOrder, "_id" | "status">;

export type OrderUpdateData = Pick<IOrder, "_id"> & Partial<Omit<IOrder, "customer" | "pets">>;
export default interface IOrder {
    _id: string;
    status: number;
    dateTimeFrom: Date;
    dateTimeTo: Date;
    rate: number;
    deposit?: number;
    comments?: string;
    customer: string;
    pets: string[];
}

export type OrderCreateData = Omit<IOrder, "_id" | "status">;

export type OrderUpdateData = Pick<IOrder, "_id"> & Partial<Omit<IOrder, "customer" | "pets">>;
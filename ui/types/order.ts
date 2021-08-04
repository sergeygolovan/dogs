export default interface IOrder {
    _id: string;
    status: number;
    dateTimeFrom: Date;
    dateTimeTo: Date;
    rate: number;
    customer: string;
    pets: string[];
    deposit?: number;
    comments?: string;
}

export type OrderCreateData = Omit<IOrder, "_id" | "status">;

export type OrderUpdateData = Pick<IOrder, "_id"> & Partial<Omit<IOrder, "customer" | "pets">>;
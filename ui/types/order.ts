export enum OrderStatus {
    'CREATED' = 0,
    'SCHEDULED' = 1,
    'IN_PROGRESS' = 2,
    'COMPLETED' = 3,
    'CLOSED' = 4,
    'NOT_PAID' = 5
}
export default interface IOrder {
    _id: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    dateTimeFrom: string;
    dateTimeTo: string;
    rate: number;
    customer: string;
    pets: string[];
    discount?: number;
    deposit?: number;
    comments?: string;
}

export type OrderCreateData = Omit<IOrder, "_id" | "status" | "createdAt" | "updatedAt">;

export type OrderUpdateData = Pick<IOrder, "_id"> & Partial<Omit<IOrder, "customer" | "pets" | "rate" | "discount" | "dateTimeFrom" | "dateTimeTo" | "createdAt" | "updatedAt">>;
export default interface IPet {
    _id: string;
    name?: string;
    image?: string;
    rating?: number;
    breed?: string;
    feed?: string;
    character?: string;
    diseases?: string;
    comments?: string;
}

export type IPetFields = Omit<IPet, "_id">;
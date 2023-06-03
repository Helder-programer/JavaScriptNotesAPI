import { Types } from "mongoose";

export interface INote {
    _id: string;
    title: string;
    body: string;
    created_at: Date;
    updated_at: Date;
    author: Types.ObjectId;
}
import { Types, Document } from "mongoose";

export interface INoteDocument extends Document {
    _id: Types.ObjectId;
    title: string;
    body: string;
    created_at: Date;
    updated_at: Date;
    author: Types.ObjectId;
}
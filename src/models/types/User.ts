import { Document, Types } from "mongoose";

export interface IUserDocument extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    isCorrectPassword(password: string): Promise<boolean>;
}
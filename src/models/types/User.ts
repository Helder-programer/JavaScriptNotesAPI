import { Types } from "mongoose";

export interface IUser {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}


export interface IUserMethods {
    isCorrectPassword(password: string): Promise<boolean>;
}
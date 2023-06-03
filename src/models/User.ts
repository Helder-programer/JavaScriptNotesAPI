import {Schema, model, Model} from "mongoose";
import bcrypt from 'bcrypt';
import {} from 'mongoose';

import { IUserDocument } from "./types/User";

let userSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    }
});

userSchema.methods.isCorrectPassword = async function isCorrectPassword(this: IUserDocument, password: string) {
    const isEqualPassword = await bcrypt.compare(password, this.password);
    return isEqualPassword;
};


export default model<IUserDocument>('User', userSchema);
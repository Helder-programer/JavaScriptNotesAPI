import {Schema, model, Model} from "mongoose";
import bcrypt from 'bcrypt';

import { IUser, IUserMethods } from "./types/User";


type UserModel = Model<IUser, {}, IUserMethods>;

let userSchema = new Schema<IUser, UserModel, IUserMethods>({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        bcrypt.hash(this.password, 10, (err, hashedPassword) => {
            if (err)
                next(err)
            else {
                this.password = hashedPassword;
                next();
            }
        });
    }
});

userSchema.method('isCorrectPassword', async function isCorrectPassword(password: string) {
    const isEqualPassword = await bcrypt.compare(password, this.password);
    return isEqualPassword
});


export default model<IUser, UserModel>('User', userSchema);
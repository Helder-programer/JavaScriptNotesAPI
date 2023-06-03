import User from "../../models/User";
import Note from "../../models/Note";

import { ICreateUserDTO } from "./dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "./dtos/IUpdateUserDTO";
import { NotFoundError } from "../../helpers/apiErrors";
import { IUserDocument } from "../../models/types/User";
import { IUserRepository } from "../types/IUserRepository";

export class UserRepository implements IUserRepository {

    public async create(data: ICreateUserDTO): Promise<void> {
        const user = new User({ name: data.name, email: data.email, password: data.password });
        await user.save();
    }

    private async findById(userId: string): Promise<IUserDocument> {
        let user = await User.findById(userId);
        if (!user) throw new NotFoundError('User not found!');
        return user;
    }


    async update(data: IUpdateUserDTO): Promise<void> {
        let user = await this.findById(data.userId);
        user.name = data.name;
        user.email = data.email;
        user.password = data.password;
        await user.save();
    }


    async deleteAccount(userId: string): Promise<void> {
        await User.findByIdAndDelete(userId);
        await Note.deleteMany({ author: userId });
    }

    async findByEmail(email: string): Promise<IUserDocument> {
        let searchedUser = await User.findOne({ email });
        return searchedUser!;
    }

}
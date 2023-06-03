import User from "../../models/User";
import Note from "../../models/Note";

import { ICreateUserDTO } from "./dtos/ICreateUserDTO.js";
import { IUpdateUserDTO } from "./dtos/IUpdateUserDTO.js";
import { NotFoundError } from "../../helpers/apiErrors.js";

export class UserRepository {

    public async create(data: ICreateUserDTO): Promise<void> {
        const user = new User({ name: data.name, email: data.email, password: data.password });
        await user.save();
    }

    private async findById(userId: string): Promise<User> {
        let user = await User.findById(userId);
        if (!user) throw new NotFoundError('User not found!');
        return user;
    }


    async update(data: IUpdateUserDTO) {
        let user = await this.findById(data.userId);
        user.name = data.name;
        user.email = data.email;
        user.password = data.password;
        await user.save();
        user = await User.findById(userId);

        return user;
    }


    async deleteAccount(userId) {
        await User.findByIdAndDelete(userId);
        await Note.deleteMany({ author: userId });
    }

    async findByEmail(email) {
        let searchedUser = await User.findOne({ email });
        return searchedUser;
    }

}
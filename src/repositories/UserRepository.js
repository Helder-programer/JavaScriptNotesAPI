import User from "../models/User.js";
import Note from "../models/Note.js";

export class UserRepository {

    async create(name, email, password) {
        const user = new User({ name, email, password });
        await user.save();
    }


    async update(userId, name, email, password) {
        let user = await User.findById(userId);
        user.name = name;
        user.email = email;
        user.password = password;
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
import User from "../models/User.js";
import Note from '../models/Note.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.JWT_TOKEN;

export default {
    async registerUser(req, res) {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        try {
            await user.save();
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error registering new user' });
        }
    },

    async login(req, res) {
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user)
                return res.status(401).json({ error: 'Incorrect email or password' });

            user.isCorrectPassword(password, function (err, same) {
                if (!same)
                    res.status(401).json({ error: 'Incorrect email or password' });
                else {
                    const token = jwt.sign({ email }, secretKey, { expiresIn: '1d' });
                    res.json({ user, token });
                }
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'internal error, please try again' });
        }
    },

    async updateUser(req, res) {
        const userId = req.user._id;
        const { name, email, password } = req.body;

        try {
            let user = await User.findById(userId);
            user.name = name;
            user.email = email;
            user.password = password;
            await user.save();
            user = await User.findById(userId);
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ erro: 'Problem to update your user' });
        }
    },

    async deleteUser(req, res) {
        const userId = req.user._id;
        try {
            await User.findByIdAndDelete(userId);
            await Note.deleteMany({author: userId});

            res.status(200).json({ message: 'OK' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ erro: 'Problem to delete your user' });
        }
    }
}
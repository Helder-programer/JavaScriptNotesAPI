import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.JWT_TOKEN;

import { BadRequestError } from '../helpers/apiErrors.js';
import { UserRepository } from '../repositories/UserRepository.js';

export class UserController {
    #userRepository;

    constructor() {
        this.#userRepository = new UserRepository();
    }

    async registerUser(req, res) {
        const { name, email, password } = req.body;

        await this.#userRepository.create(name, email, password);

        res.status(200).json({ message: 'User sucessfully created' });
    }

    async login(req, res) {
        const { email, password } = req.body;

        let user = await this.#userRepository.findByEmail(email);
        if (!user) 
            throw new BadRequestError('Incorrect email or password');

        user.isCorrectPassword(password, function (err, same) {
            if (!same)
                throw new BadRequestError('Incorrect email or password');
            else {
                const token = jwt.sign({ email }, secretKey, { expiresIn: '1d' });
                res.json({ user, token });
            }
        });
    }

    async updateUser(req, res) {
        const userId = req.user._id;
        const { name, email, password } = req.body;

        const user = await this.#userRepository.update(userId, name, email, password);

        res.status(200).json(user);
    }

    async removeUser(req, res) {
        const userId = req.user._id;
        await this.#userRepository.deleteAccount(userId);

        res.status(200).json({ message: 'User successfully deleted' });
    }
}
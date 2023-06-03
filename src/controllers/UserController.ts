import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();
const secretKey = process.env.JWT_TOKEN;

import { BadRequestError } from '../helpers/apiErrors.js';
import { UserRepository } from '../repositories/user/UserRepository.js';

export class UserController {
    #userRepository;

    constructor() {
        this.#userRepository = new UserRepository();
    }

    async registerUser(req: Request, res: Response) {
        const { name, email, password } = req.body;

        await this.#userRepository.create(name, email, password);

        res.status(200).json({ message: 'User sucessfully created' });
    }

    async login(req: Request, res: Response) {
        const { email, password }: any = req.body;

        let user = await this.#userRepository.findByEmail(email);
        if (!user) 
            throw new BadRequestError('Incorrect email or password');

        if (await user.isCorrectPassword(password)) {
            const token = jwt.sign({ email }, secretKey, { expiresIn: '1d' });
            res.status(200).json({});
        }
    }

    async updateUser(req: Request, res: Response) {
        const userId = req.user._id;
        const { name, email, password } = req.body;

        const user = await this.#userRepository.update(userId, name, email, password);

        res.status(200).json(user);
    }

    async removeUser(req: Request, res: Response) {
        const userId = req.user._id;
        await this.#userRepository.deleteAccount(userId);

        res.status(200).json({ message: 'User successfully deleted' });
    }
}
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

import { UserRepository } from '../repositories/user/UserRepository';
import { UnauthorizedError } from '../helpers/apiErrors';
dotenv.config();
const secretKey: string = process.env.JWT_TOKEN!;

export const WithAuth = (req: Request, res: Response, next: NextFunction) => {
    const userRepository = new UserRepository();
    const token: any = req.headers['access-token'];
    if (!token) throw new UnauthorizedError('Unauthorized: No token provided');

    jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err) throw new UnauthorizedError('Unauthorized: Invalid token');

        userRepository.findByEmail(decoded.email)
            .then(user => {
                req.user = user;
                next();
            });
    });


}
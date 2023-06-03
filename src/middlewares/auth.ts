import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

import { UnauthorizedError } from '../helpers/apiErrors.js';
dotenv.config();
const secretKey: string = process.env.JWT_TOKEN!;

export const WithAuth = (req: Request, res: Response, next: NextFunction) => {
    const token: any = req.headers['access-token'];
    if (!token) throw new UnauthorizedError('Unauthorized: No token provided');

    jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err) throw new UnauthorizedError('Unauthorized: Invalid token');

        User.findOne({ email: decoded.email })
            .then(user => {
                req.user = user;
                next();
            });
    });


}
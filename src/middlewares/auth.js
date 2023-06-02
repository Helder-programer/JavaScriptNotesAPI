import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
import { UnauthorizedError } from '../helpers/apiErrors.js';
dotenv.config();
const secretKey = process.env.JWT_TOKEN;

export const WithAuth = (req, res, next) => {
    const token = req.headers['access-token'];
    if (!token) throw new UnauthorizedError('Unauthorized: No token provided');

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) throw new UnauthorizedError('Unauthorized: Invalid token');

        req.email = decoded.email;
        User.findOne({ email: decoded.email })
            .then(user => {
                req.user = user;
                next();
            });
    });


}
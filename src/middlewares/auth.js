import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.JWT_TOKEN;

export const WithAuth = (req, res, next) => {
    const token = req.headers['access-token'];
    if (!token) return res.status(401).json({ error: 'Unauthorized: No token provided' });

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Unauthorized: Invalid token'});

        req.email = decoded.email;
        User.findOne({ email: decoded.email })
            .then(user => {
                req.user = user;
                next();
            })
            .catch(error => {
                res.status(401).json({ error });
            });
    });


}
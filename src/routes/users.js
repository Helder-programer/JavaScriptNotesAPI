import express from 'express';
import usersController from '../controllers/usersController.js';
import { WithAuth } from '../middlewares/auth.js';
const router = express.Router();


router.post('/register', usersController.registerUser);
router.post('/login', usersController.login);
router.put('/', WithAuth, usersController.updateUser);
router.delete('/', WithAuth, usersController.deleteUser);

export default router;

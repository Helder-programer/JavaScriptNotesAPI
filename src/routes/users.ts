import express from 'express';
const router = express.Router();

import { UserController } from '../controllers/UserController';
import { WithAuth } from '../middlewares/auth';
import { UserRepository } from '../repositories/user/UserRepository';

const repository = new UserRepository();
const controller = new UserController(repository);

router.post('/register', (req, res) => controller.registerUser(req, res));
router.post('/login', (req, res) => controller.login(req, res));
router.put('/', WithAuth, (req, res) => controller.updateUser(req, res));
router.delete('/', WithAuth, (req, res) => controller.removeUser(req, res));

export default router;

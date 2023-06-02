import express from 'express';
const router = express.Router();

import { UserController } from '../controllers/UserController.js';
import { WithAuth } from '../middlewares/auth.js';


const controller = new UserController();

router.post('/register', (req, res) => controller.registerUser(req, res));
router.post('/login', (req, res) => controller.login(req, res));
router.put('/', WithAuth, (req, res) => controller.updateUser(req, res));
router.delete('/', WithAuth, (req, res) => controller.removeUser(req, res));

export default router;

import express from 'express';

import { NoteController } from '../controllers/NoteController.js';
import { WithAuth } from '../middlewares/auth.js';

const router = express.Router();
const controller = new NoteController();



router.post('/', WithAuth, (req, res) => controller.createNote(req, res));
router.get('/search', WithAuth, (req, res) => controller.searchNotes(req, res));
router.get('/:id', WithAuth, (req, res) => controller.getNote(req, res));
router.get('/', WithAuth, (req, res) => controller.showNotes(req, res));
router.put('/:id', WithAuth, (req, res) => controller.updateNote(req, res));
router.delete('/:id', WithAuth, (req, res) => controller.removeNote(req, res));


export default router;
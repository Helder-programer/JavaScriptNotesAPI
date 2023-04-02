import express from 'express';
import notesController from '../controllers/notesController.js';
import { WithAuth } from '../middlewares/auth.js';
const router = express.Router();


router.post('/', WithAuth, notesController.addNote);
router.get('/search', WithAuth, notesController.searchNote);
router.get('/:id', WithAuth, notesController.getNote);
router.get('/', WithAuth, notesController.showNotes);
router.put('/:id', WithAuth, notesController.updateNote);
router.delete('/:id', WithAuth, notesController.deleteNote);


export default router;
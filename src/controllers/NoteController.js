import { NoteRepository } from '../repositories/NoteRepository.js';

export class NoteController {
    #noteRepository;

    constructor() {
        this.#noteRepository = new NoteRepository();
    }



    async createNote(req, res) {
        const { title, body } = req.body;
        const user = req.user;

        await this.#noteRepository.create(title, body, user);
        res.status(200).json({ message: 'Note successfully created' });
    }

    async getNote(req, res) {
        const { id } = req.params;
        const user = req.user;

        const note = await this.#noteRepository.getNote(id, user);

        res.status(200).json(note);
    }

    async showNotes(req, res) {
        const user = req.user;

        const notes = await this.#noteRepository.findAll(user);

        res.status(200).json(notes);
    }

    async updateNote(req, res) {
        const { id } = req.params;
        const { title, body } = req.body;
        const user = req.user;


        let noteToUpdate = await this.#noteRepository.update(id, title, body, user);
        res.status(200).json(noteToUpdate);
    }

    async removeNote(req, res) {
        const { id } = req.params;
        const user = req.user;

        await this.#noteRepository.remove(id, user);
        res.status(200).json({ message: 'Note successfully deleted' });
    }

    async searchNotes(req, res) {
        const { query } = req.query;
        const user = req.user;

        let searchedNotes = await this.#noteRepository.search(query, user);
        res.status(200).json(searchedNotes);
    }
}
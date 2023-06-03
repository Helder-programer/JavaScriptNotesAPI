import { Request, Response } from 'express';

import { INoteRepository } from '../repositories/types/INoterepository';

export class NoteController {

    constructor(
        private noteRepository: INoteRepository
    ) {
        this.noteRepository = noteRepository;
    }



    async createNote(req: Request, res: Response) {
        const { title, body } = req.body;
        const user = req.user!;

        await this.noteRepository.create({ title, body, user });
        res.status(200).json({ message: 'Note successfully created' });
    }

    async getNote(req: Request, res: Response) {
        const { id } = req.params;
        const user = req.user!;

        const note = await this.noteRepository.getNote({noteId: id, user});

        res.status(200).json(note);
    }

    async showNotes(req: Request, res: Response) {
        const user = req.user!;

        const notes = await this.noteRepository.findAll(user);

        res.status(200).json(notes);
    }

    async updateNote(req: Request, res: Response) {
        const { id } = req.params;
        const { title, body } = req.body;
        const user = req.user!;


        let noteToUpdate = await this.noteRepository.update({ noteId: id, title, body, user });
        res.status(200).json(noteToUpdate);
    }

    async removeNote(req: Request, res: Response) {
        const { id } = req.params;
        const user = req.user!;

        await this.noteRepository.remove({ noteId: id, user });
        res.status(200).json({ message: 'Note successfully deleted' });
    }

    async searchNotes(req: Request, res: Response) {
        const { query }: any = req.query;
        const user = req.user!;

        let searchedNotes = await this.noteRepository.search({ query, user });
        res.status(200).json(searchedNotes);
    }
}
import Note from "../../models/Note.js";
import { NotFoundError, UnauthorizedError } from '../../helpers/apiErrors.js';
import { isOwner } from "../../helpers/notes.js";


export class NoteRepository {

    async create(title, body, user) {

        const note = new Note({ title, body, author: user._id });
        await note.save();

    }

    async update(noteId, title, body, user) {

        let noteToUpdate = await this.#findById(noteId, user);

        if (body) {
            noteToUpdate = await Note.findByIdAndUpdate(noteId, { $set: { body } }, { upsert: true, new: true });
        } else {
            noteToUpdate = await Note.findByIdAndUpdate(noteId, { $set: { title } }, { upsert: true, new: true });
        }

        return noteToUpdate;
    }


    async #findById(noteId, user) {
        let searchedNote = await Note.findById(noteId).findOne({ author: user._id });

        if (!searchedNote) throw new NotFoundError('Note not found!');

        return searchedNote;
    }


    async remove(noteId, user) {
        let noteToDelete = await this.#findById(noteId, user);
        if (!isOwner(user, noteToDelete)) throw new UnauthorizedError('Permission denied');
        await Note.findByIdAndDelete(noteId);
    }


    async getNote(noteId, user) {
        let note = await this.#findById(noteId, user);

        return note;
    }

    async findAll(user) {
        let notes = await Note.find({ author: user._id });
        return notes;
    }

    async search(query, user) {
        let searchedNotes = [];

        if (query) {
            searchedNotes = await Note
                .find({ author: user._id })
                .find({ $text: { $search: query } });
            return searchedNotes;
        }

        searchedNotes = await this.findAll(user);

        return searchedNotes;
    }

}
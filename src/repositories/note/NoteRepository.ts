import Note from "../../models/Note";
import { NotFoundError, UnauthorizedError } from '../../helpers/apiErrors';
import { isOwner } from "../../helpers/notes";
import { IUserDocument } from "../../models/types/User";
import { ICreateNoteDTO } from "./dtos/ICreateNoteDTO";
import { IUpdateNoteDTO } from "./dtos/IUpdateNoteDTO";
import { INoteDocument } from "../../models/types/Note";


export class NoteRepository {

    async create(data: ICreateNoteDTO) {

        const note = new Note({ title: data.title, body: data.body, author: data.user._id });
        await note.save();

    }

    async update(data: IUpdateNoteDTO): Promise<INoteDocument> {

        let noteToUpdate: INoteDocument;

        if (data.body) {
            noteToUpdate = await Note.findByIdAndUpdate(data.noteId, { $set: { body: data.body } }, { upsert: true, new: true });
        } else {
            noteToUpdate = await Note.findByIdAndUpdate(data.noteId, { $set: { title: data.title } }, { upsert: true, new: true });
        }

        return noteToUpdate;
    }


    private async findById(noteId, user) {
        let searchedNote = await Note.findById(noteId).findOne({ author: user._id });

        if (!searchedNote) throw new NotFoundError('Note not found!');

        return searchedNote;
    }


    async remove(noteId, user) {
        let noteToDelete = await this.findById(noteId, user);
        if (!isOwner(user, noteToDelete)) throw new UnauthorizedError('Permission denied');
        await Note.findByIdAndDelete(noteId);
    }


    async getNote(noteId, user) {
        let note = await this.findById(noteId, user);
        return note;
    }

    async findAll(user: IUserDocument) {
        let notes = await Note.find({ author: user._id });
        return notes;
    }

    async search(query: string, user: IUserDocument) {
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
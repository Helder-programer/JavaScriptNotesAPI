import Note from "../../models/Note";
import { NotFoundError, UnauthorizedError } from '../../helpers/apiErrors';
import { IUserDocument } from "../../models/types/User";
import { ICreateNoteDTO } from "./dtos/ICreateNoteDTO";
import { IUpdateNoteDTO } from "./dtos/IUpdateNoteDTO";
import { INoteDocument } from "../../models/types/Note";
import { IRemoveNoteDTO } from "./dtos/IRemoveNoteDTO";
import { IGetNoteDTO } from "./dtos/IGetNoteDTO";
import { ISearchNoteDTO } from "./dtos/ISearchNoteDTO";


export class NoteRepository {

    public async create(data: ICreateNoteDTO) {

        const note = new Note({ title: data.title, body: data.body, author: data.user._id });
        await note.save();

    }

    public async update(data: IUpdateNoteDTO): Promise<INoteDocument> {

        let noteToUpdate: INoteDocument;

        if (data.body) {
            noteToUpdate = await Note.findByIdAndUpdate(data.noteId, { $set: { body: data.body } }, { upsert: true, new: true });
        } else {
            noteToUpdate = await Note.findByIdAndUpdate(data.noteId, { $set: { title: data.title } }, { upsert: true, new: true });
        }

        return noteToUpdate;
    }


    private async findById(noteId: string, user: IUserDocument) {
        let searchedNote = await Note.findById(noteId).findOne({ author: user._id });

        if (!searchedNote) throw new NotFoundError('Note not found!');

        return searchedNote;
    }


    public async remove(data: IRemoveNoteDTO) {
        let noteToDelete = await this.findById(data.noteId, data.user);
        await noteToDelete.deleteOne();
    }


    public async getNote(data: IGetNoteDTO) {
        let note = await this.findById(data.noteId, data.user);
        return note;
    }

    public async findAll(user: IUserDocument) {
        let notes = await Note.find({ author: user._id });
        return notes;
    }

    async search(data: ISearchNoteDTO) {
        let searchedNotes = [];

        if (data.query) {
            searchedNotes = await Note
                .find({ author: data.user._id })
                .find({ $text: { $search: data.query } });
            return searchedNotes;
        }

        searchedNotes = await this.findAll(data.user);

        return searchedNotes;
    }
}
import { INoteDocument } from "../../models/types/Note";
import { IUserDocument } from "../../models/types/User";
import { ICreateNoteDTO } from "../note/dtos/ICreateNoteDTO";
import { IGetNoteDTO } from "../note/dtos/IGetNoteDTO";
import { IRemoveNoteDTO } from "../note/dtos/IRemoveNoteDTO";
import { ISearchNoteDTO } from "../note/dtos/ISearchNoteDTO";
import { IUpdateNoteDTO } from "../note/dtos/IUpdateNoteDTO";

export interface INoteRepository {
    create(data: ICreateNoteDTO): Promise<void>;
    update(data: IUpdateNoteDTO): Promise<INoteDocument>;
    remove(data: IRemoveNoteDTO): Promise<void>;
    getNote(data: IGetNoteDTO): Promise<INoteDocument>;
    search(data: ISearchNoteDTO): Promise<INoteDocument[]>;
    findAll(user: IUserDocument): Promise<INoteDocument[]>;
}
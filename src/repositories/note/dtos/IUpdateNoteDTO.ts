import { IUserDocument } from "../../../models/types/User";

export interface IUpdateNoteDTO {
    noteId: string;
    title: string;
    body: string;
    user: IUserDocument;
}
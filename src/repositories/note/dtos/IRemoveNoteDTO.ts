import { IUserDocument } from "../../../models/types/User";

export interface IRemoveNoteDTO {
    noteId: string;
    user: IUserDocument;
}
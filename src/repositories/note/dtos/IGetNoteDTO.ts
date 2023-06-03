import { IUserDocument } from "../../../models/types/User";

export interface IGetNoteDTO {
    noteId: string;
    user: IUserDocument;
}
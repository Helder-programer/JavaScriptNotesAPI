import { IUserDocument } from "../../../models/types/User";

export interface ICreateNoteDTO {
    title: string;
    body: string;
    user: IUserDocument;
}
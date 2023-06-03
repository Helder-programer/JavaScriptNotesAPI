import { IUserDocument } from "../../../models/types/User";

export interface ISearchNoteDTO {
    query: string | undefined | null;
    user: IUserDocument;
}
import { IUserDocument } from "../../models/types/User";
import { ICreateUserDTO } from "../user/dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../user/dtos/IUpdateUserDTO";

export interface IUserRepository {
    create(data: ICreateUserDTO): Promise<void>;
    update(data: IUpdateUserDTO): Promise<void>;
    deleteAccount(userId: string): Promise<void>;
    findByEmail(email: string): Promise<IUserDocument>;
}
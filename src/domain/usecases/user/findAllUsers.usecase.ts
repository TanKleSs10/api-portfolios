import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";

export interface IFindAllUsersUseCase {
    execute(): Promise<UserEntity[]>;
} 

export class FindAllUsersUseCase implements IFindAllUsersUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    execute(): Promise<UserEntity[]> {
        return this.userRepository.findAllUsers();
    }
}   
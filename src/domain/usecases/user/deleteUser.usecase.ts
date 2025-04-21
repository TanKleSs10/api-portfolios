import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";

export interface IDeleteUserUseCase {
    execute(id: string): Promise<UserEntity>;
} 

export class DeleteUserUseCase implements IDeleteUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    execute(id: string): Promise<UserEntity> {
        return this.userRepository.deleteUser(id);
    }
} 
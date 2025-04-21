import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";

export interface IFindUserByIdUseCase {
    execute(id: string): Promise<UserEntity>;
} 

export class FindUserByIdUseCase implements IFindUserByIdUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    execute(id: string): Promise<UserEntity> {
        return this.userRepository.findUserById(id);
    }
}
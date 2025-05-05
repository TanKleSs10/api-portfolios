import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";

export interface IFindUserByEmailUseCase {
    execute(email: string): Promise<UserEntity>;
} 

export class FindUserByEmailUseCase implements IFindUserByEmailUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    execute(email: string): Promise<UserEntity> {
        return this.userRepository.findUserByEmail(email);
    }
}
import { UserResponseDto } from "../../dtos/user/userResponseDto";
import { UserRepository } from "../../repositories/user.repository";

export interface IFindAllUsersUseCase {
    execute(): Promise<UserResponseDto[]>;
} 

export class FindAllUsersUseCase implements IFindAllUsersUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    execute(): Promise<UserResponseDto[]> {
        return this.userRepository.findAllUsers();
    }
}   
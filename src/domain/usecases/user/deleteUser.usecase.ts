import { UserResponseDto } from "../../dtos/user/userResponseDto";
import { UserRepository } from "../../repositories/user.repository";

export interface IDeleteUserUseCase {
    execute(id: string): Promise<UserResponseDto>;
} 

export class DeleteUserUseCase implements IDeleteUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    execute(id: string): Promise<UserResponseDto> {
        return this.userRepository.deleteUser(id);
    }
} 
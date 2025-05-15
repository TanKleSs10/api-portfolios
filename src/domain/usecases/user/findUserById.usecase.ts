import { UserResponseDto } from "../../dtos/user/userResponseDto";
import { UserRepository } from "../../repositories/user.repository";

export interface IFindUserByIdUseCase {
    execute(id: string): Promise<UserResponseDto>;
} 

export class FindUserByIdUseCase implements IFindUserByIdUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    execute(id: string): Promise<UserResponseDto> {
        return this.userRepository.findUserById(id);
    }
}
import { UpdateUserDto } from "../../dtos/user/updateuser.dto";
import { UserResponseDto } from "../../dtos/user/userResponseDto";
import { UserRepository } from "../../repositories/user.repository";

export interface IUpdateUserUseCase {
    execute(updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
}   

export class UpdateUserUseCase implements IUpdateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    execute(updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        return this.userRepository.updateUser(updateUserDto);
    }
}
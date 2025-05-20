import { CreateUserDto } from "../../dtos/user/createuser.dto";
import { UserResponseDto } from "../../dtos/user/userResponseDto";
import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";

export interface ICreateUserUseCase {
    execute(createUserDto: CreateUserDto): Promise<{user: UserResponseDto, token: unknown}>;
} 

export class CreateUserUseCase implements ICreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    execute(createUserDto: CreateUserDto): Promise<{user: UserResponseDto, token: unknown}> {
        return this.userRepository.createUser(createUserDto);
    }
}
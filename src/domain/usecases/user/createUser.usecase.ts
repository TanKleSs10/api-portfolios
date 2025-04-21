import { CreateUserDto } from "../../dtos/user/createuser.dto";
import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";

export interface ICreateUserUseCase {
    execute(createUserDto: CreateUserDto): Promise<UserEntity>;
} 

export class CreateUserUseCase implements ICreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    execute(createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.userRepository.createUser(createUserDto);
    }
}
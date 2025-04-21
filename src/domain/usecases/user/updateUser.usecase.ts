import { UpdateUserDto } from "../../dtos/user/updateuser.dto";
import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";

export interface IUpdateUserUseCase {
    execute(updateUserDto: UpdateUserDto): Promise<UserEntity>;
}   

export class UpdateUserUseCase implements IUpdateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    execute(updateUserDto: UpdateUserDto): Promise<UserEntity> {
        return this.userRepository.updateUser(updateUserDto);
    }
}
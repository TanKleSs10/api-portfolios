import { CreateUserDto } from "../dtos/user/createuser.dto";
import { UpdateUserDto } from "../dtos/user/updateuser.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class UserDataSource {
    abstract createUser(createUserDto: CreateUserDto): Promise<UserEntity>;
    abstract findUserById(id: string): Promise<UserEntity>;
    abstract findUserByEmail(email: string): Promise<UserEntity>;
    abstract findAllUsers(): Promise<UserEntity[]>;
    abstract updateUser(updateUserDto: UpdateUserDto): Promise<UserEntity>;
    abstract deleteUser(id: string): Promise<UserEntity>;
}
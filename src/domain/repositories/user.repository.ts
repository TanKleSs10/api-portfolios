import { CreateUserDto } from "../dtos/user/createuser.dto";
import { UpdateUserDto } from "../dtos/user/updateuser.dto";
import { UserResponseDto } from "../dtos/user/userResponseDto";

export abstract class UserRepository {
    abstract createUser(createUserDto: CreateUserDto): Promise<{ user: UserResponseDto, token: unknown }>;
    abstract findUserById(id: string): Promise<UserResponseDto>;
    abstract findAllUsers(): Promise<UserResponseDto[]>;
    abstract updateUser(updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
    abstract deleteUser(id: string): Promise<UserResponseDto>;
}
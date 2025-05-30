import { UserDataSource } from "../../domain/datasources/user.datasource";
import { CreateUserDto } from "../../domain/dtos/user/createuser.dto";
import { UpdateUserDto } from "../../domain/dtos/user/updateuser.dto";
import { UserRepository } from "../../domain/repositories/user.repository";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { UserResponseDto } from "../../domain/dtos/user/userResponseDto";

export class UserRepositoryImpl implements UserRepository {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly userDataSource: UserDataSource,
    ){}

    async createUser(createUserDto: CreateUserDto): Promise<{ user: UserResponseDto, token: unknown }> {
        // check if user already exists
        const userFind = await this.userDataSource.findUserByEmail(createUserDto.email);
        if(userFind) throw new Error("Bad Request: User already exists.");
        // Encrypt password
        createUserDto.password = await this.authRepository.encryptPassword(createUserDto.password);
        // get user data
        const user = await this.userDataSource.createUser(createUserDto);
        // Enviar el token al usuario
        const {success, token} = await this.authRepository.sendValidationEmail(user.email, user.name);
        // validate if email was sent
        if(!success) throw new Error("Internal Server Error: Failed to send email.");
        return { user: UserResponseDto.fromEntity(user), token: token };
    }

    async findUserById(id: string): Promise<UserResponseDto> {
        const user = await this.userDataSource.findUserById(id);
        return UserResponseDto.fromEntity(user);
    }

    async findAllUsers(): Promise<UserResponseDto[]> {
        const users = await this.userDataSource.findAllUsers();
        return users.map(user => UserResponseDto.fromEntity(user));
    }

    async updateUser(updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        const user = await this.userDataSource.updateUser(updateUserDto);
        return UserResponseDto.fromEntity(user);
    }

    async deleteUser(ID: string): Promise<UserResponseDto> {
        const user = await this.userDataSource.deleteUser(ID);
        return UserResponseDto.fromEntity(user);
    }
}
import { UserDataSource } from "../../domain/datasources/user.datasource";
import { CreateUserDto } from "../../domain/dtos/user/createuser.dto";
import { UpdateUserDto } from "../../domain/dtos/user/updateuser.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

export class UserRepositoryImpl implements UserRepository {
    constructor(
        private readonly userDataSource: UserDataSource
    ){}

    createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.userDataSource.createUser(createUserDto);
    }
    findUserById(id: string): Promise<UserEntity> {
        return this.userDataSource.findUserById(id);
    }
    findAllUsers(): Promise<UserEntity[]> {
        return this.userDataSource.findAllUsers();
    }
    updateUser(updateUserDto: UpdateUserDto): Promise<UserEntity> {
        return this.userDataSource.updateUser(updateUserDto);
    }
    deleteUser(ID: string): Promise<UserEntity> {
        return this.userDataSource.deleteUser(ID);
    }

}
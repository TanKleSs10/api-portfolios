import { UserDataSource } from "../../domain/datasources/user.datasource";
import { CreateUserDto } from "../../domain/dtos/user/createuser.dto";
import { UpdateUserDto } from "../../domain/dtos/user/updateuser.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { userModel } from "../models/user/userModel";

export class UserDataSourceImpl implements UserDataSource {
      
    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = await userModel.create(createUserDto);
        return UserEntity.fromObject(user);
      }
    
    async findUserByEmail(email: string): Promise<UserEntity | null> {
        const user = await userModel.findOne({ email });
        if(!user) {
            return null;
        }
        return UserEntity.fromObject(user);
    }

    async findUserById(id: string): Promise<UserEntity> {
        const user = await userModel.findById(id);
        return UserEntity.fromObject(user);
    }

    async findAllUsers(): Promise<UserEntity[]> {
        const users = await userModel.find();
        return users.map(user => UserEntity.fromObject(user));
    }
    
    async updateUser(updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = await userModel.findByIdAndUpdate(
          updateUserDto.id,
          { $set: updateUserDto.values },
          { new: true, runValidators: true }
        );
        return UserEntity.fromObject(user);
      }
    
    async deleteUser(id: string): Promise<UserEntity> {
        const deletedUser = await userModel.findByIdAndDelete(id);
        return UserEntity.fromObject(deletedUser);
      }

    // Funtions of Authentication 

    async emailValidated(email: string): Promise<UserEntity> {
        const user = await userModel.updateOne({ email }, { emailValidated: true });
        return UserEntity.fromObject(user);
    }
}
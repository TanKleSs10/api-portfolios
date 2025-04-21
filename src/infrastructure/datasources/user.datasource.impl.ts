import { Types } from "mongoose";
import { UserDataSource } from "../../domain/datasources/user.datasource";
import { CreateUserDto } from "../../domain/dtos/user/createuser.dto";
import { UpdateUserDto } from "../../domain/dtos/user/updateuser.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { userModel } from "../models/user/userModel";
import { BcryptAdapter } from "../adapters/bcript.adapter";

const bcriptAdapter = new BcryptAdapter();

export class UserDataSourceImpl implements UserDataSource {
    
    async findUserByEmail(email: string): Promise<UserEntity> {
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error("User not found.");
        }
        return UserEntity.fromObject(user);
    }
    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        createUserDto.password = await bcriptAdapter.hash(createUserDto.password);
        const user = await userModel.create(createUserDto); // 👈 No necesitas { $set }
        return UserEntity.fromObject(user.toObject());
      }

    async findUserById(id: string): Promise<UserEntity> {
        if (!Types.ObjectId.isValid(id)) {
            throw new Error("Invalid user ID.");
          }

        const user = await userModel.findById(id);
        if (!user) {
            throw new Error("User not found.");
        }
        return UserEntity.fromObject(user);
    }

    async findAllUsers(): Promise<UserEntity[]> {
        const users = await userModel.find();
        return users.map(user => UserEntity.fromObject(user));
    }
    
    async updateUser(updateUserDto: UpdateUserDto): Promise<UserEntity> {
        if (!Types.ObjectId.isValid(updateUserDto.id)) {
          throw new Error("Invalid user ID.");
        }
        const user = await userModel.findByIdAndUpdate(
          updateUserDto.id,
          { $set: updateUserDto.values },
          { new: true, runValidators: true } // 👈 Devuelve el doc actualizado y valida
        );
        if (!user) {
          throw new Error("User not found.");
        }
        return UserEntity.fromObject(user.toObject());
      }
    
    async deleteUser(id: string): Promise<UserEntity> {
        if (!Types.ObjectId.isValid(id)) {
          throw new Error("Invalid user ID.");
        }
        
        const deletedUser = await userModel.findByIdAndDelete(id);
        if (!deletedUser) {
          throw new Error("User not found.");
        }
    
        return UserEntity.fromObject(deletedUser.toObject());
      }

}
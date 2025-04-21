import { Request, Response } from "express";
import { UserRepository } from "../../domain/repositories/user.repository";
import { FindAllUsersUseCase } from "../../domain/usecases/user/findAllUsers.usecase";
import { FindUserByIdUseCase } from "../../domain/usecases/user/findUserById.usecase";
import { CreateUserDto } from "../../domain/dtos/user/createuser.dto";
import { CreateUserUseCase } from "../../domain/usecases/user/createUser.usecase";
import { UpdateUserDto } from "../../domain/dtos/user/updateuser.dto";
import { UpdateUserUseCase } from "../../domain/usecases/user/updateUser.usecase";
import { DeleteUserUseCase } from "../../domain/usecases/user/deleteUser.usecase";

export class UserController {
    
    constructor(
        private readonly userRepository: UserRepository
    ){}
    
    public getUsers = (_req:Request, res: Response) => {
        new FindAllUsersUseCase(this.userRepository).execute().then(users => {
             res.status(200).json(users);
        }).catch(err => {
             res.status(400).json(err);
        });
    }

    public getUserById = (req:Request, res: Response) => {
        const { id } = req.params;
        new FindUserByIdUseCase(this.userRepository).execute(id).then(user => { 
             res.status(200).json(user);
        }).catch(err => {
             res.status(400).json(err);
        });
    }

    public createUser = (req:Request, res: Response) => {
        const [error, createUserDto] = CreateUserDto.create(req.body);
        if(error)  res.status(400).json(error);
        new CreateUserUseCase(this.userRepository).execute(createUserDto!).then(user => {
            res.status(201).json(user);
        }).catch(error => {
            res.status(400).json(error);
        });
    }

    public updateUser = (req:Request, res: Response) => {
        const { id } = req.params;
        const [error, updateUserDto] = UpdateUserDto.create({...req.body, id});
        if(error)  res.status(400).json(error);

        new UpdateUserUseCase (this.userRepository).execute(updateUserDto!).then(user => {
             res.status(200).json(user);
        }).catch(error => {
             res.status(400).json(error);
        });
    }

    public deleteUser = (req:Request, res: Response) => {
        const { id } = req.params;
        new DeleteUserUseCase(this.userRepository).execute(id).then(user => {
             res.status(200).json(user);
        }).catch(error => {
             res.status(400).json(error);
        });
    }
}
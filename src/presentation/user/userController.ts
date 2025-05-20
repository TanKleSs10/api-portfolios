import { Request, Response } from "express";
import { UserRepository } from "../../domain/repositories/user.repository";
import { FindAllUsersUseCase } from "../../domain/usecases/user/findAllUsers.usecase";
import { FindUserByIdUseCase } from "../../domain/usecases/user/findUserById.usecase";
import { CreateUserDto } from "../../domain/dtos/user/createuser.dto";
import { CreateUserUseCase } from "../../domain/usecases/user/createUser.usecase";
import { UpdateUserDto } from "../../domain/dtos/user/updateuser.dto";
import { UpdateUserUseCase } from "../../domain/usecases/user/updateUser.usecase";
import { DeleteUserUseCase } from "../../domain/usecases/user/deleteUser.usecase";
import { WinstonLogger } from "../../config/winstonConfig";

export class UserController {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly logger: WinstonLogger
    ) {}
    
    createUser = (req:Request, res: Response) => {
        const [error, createUserDto] = CreateUserDto.create(req.body);
        if(error){
            this.logger.error("Error creating user", { error: error }, "userController");
            res.status(400).json({
                success: false,
                message: "Error al crear usuario",
                data: error
            })
        }else{
            new CreateUserUseCase(this.userRepository).execute(createUserDto!).then(user => {
                res.status(201).json({
                    success: true,
                    message: "Usuario creado correctamente",
                    data: user
                });
            }).catch(error => {
                this.logger.error("Error creating user", error, "userController");
                res.status(400).json({
                    success: false,
                    message: "Error al crear usuario",
                    data: error
                });
            });
        }
    }

    getUsers = (_req:Request, res: Response) => {
        new FindAllUsersUseCase(this.userRepository).execute().then(users => {
             res.status(200).json({
                 success: true,
                 message: "Usuarios obtenidos correctamente",
                 data: users
             });
        }).catch(error => {
            this.logger.error("Error fetching users", { error: error as string }, "userController");
            res.status(400).json({
                 success: false,
                 message: "Error al obtener usuarios",
                 data: error
             });
        });
    }

    getUserById = (req:Request, res: Response) => {
        const { id } = req.params;
        new FindUserByIdUseCase(this.userRepository).execute(id).then(user => { 
             res.status(200).json({
                 success: true,
                 message: "Usuario obtenido correctamente",
                 data: user
             });
        }).catch(error => {
            this.logger.error("Error fetching user", { error: error }, "userController");
             res.status(400).json({
                 success: false,
                 message: "Error al obtener usuario",
                 data: error
             });
        });
    }

    getUserByEmail = (req:Request, res: Response) => {
        const { email } = req.params;
        new FindUserByIdUseCase(this.userRepository).execute(email).then(user => { 
            res.status(200).json({
                success: true,
                message: "Usuario obtenido correctamente",
                data: user
            });
        }).catch(error => {
            this.logger.error("Error fetching user", error, "userController");
            res.status(400).json({
                success: false,
                message: "Error al obtener usuario",
                data: error
            });
        });
    }

    updateUser = (req:Request, res: Response) => {
        const { id } = req.params;
        const [error, updateUserDto] = UpdateUserDto.create({...req.body, id});
        if(error) {
            this.logger.error("Error updating user", { error: error }, "userController");
            res.status(400).json({
                success: false,
                message: "Error al actualizar usuario",
                data: error
            })
        }else{
            new UpdateUserUseCase(this.userRepository).execute(updateUserDto!).then(user => {
                res.status(200).json({
                    success: true,
                    message: "Usuario actualizado correctamente",
                    data: user
                });
            }).catch(error => {
                this.logger.error("Error updating user", { error: error }, "userController");
                res.status(400).json({
                    success: false,
                    message: "Error al actualizar usuario",
                    data: error
                });
            });
        }
    }

    deleteUser = (req:Request, res: Response) => {
        const { id } = req.params;
        new DeleteUserUseCase(this.userRepository).execute(id).then(user => {
             res.status(200).json({
                 success: true,
                 message: "Usuario eliminado correctamente",
                 data: user
             });
        }).catch(error => {
            this.logger.error("Error deleting user", error, "userController");
             res.status(400).json({
                 success: false,
                 message: "Error al eliminar usuario",
                 data: error
             });
        });
    }
}
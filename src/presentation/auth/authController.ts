import { Request, Response } from "express";
import { LoginUserDto } from "../../domain/dtos/auth/loginUser.dto";
import { AuthRepository } from "../../domain/repositories/auth.repository.";
import { LoginUseCase } from "../../domain/usecases/auth/login.usecase";
import { VerifyEmailUseCase } from "../../domain/usecases/auth/verifyEmail.usecase";

export class AuthController {
    constructor(
        private readonly authRepository: AuthRepository,
    ) {}

    loginUser = (req:Request, res: Response) => {
            console.log(req.body)
            const [error, loginUserDto] = LoginUserDto.create(req.body);
            if(error) {
                res.status(400).json({
                    success: false,
                    message: "Error al iniciar sesión",
                    data: error
                })
            }else{
                new LoginUseCase(this.authRepository).execute(loginUserDto!).then(user => {
                    res.status(200).json({
                        success: true,
                        message: "Sesión iniciada correctamente",
                        data: user
                    });
                }).catch(error => {
                    console.log(error)
                    res.status(400).json({
                        success: false,
                        message: "Error al iniciar sesión",
                        data: error
                    });
                });
            }
        }

    verifyEmail = (req: Request, res: Response) => {
        const token = req.params.token;
        new VerifyEmailUseCase(this.authRepository).execute(token).then(success => {
            res.status(200).json({
                success,
                message: "Email verificado correctamente",
            });
        }).catch(error => {
            console.log(error)
            res.status(400).json({
                success: false,
                message: "Error al verificar el email",
                data: error
                });
        });
    }
}
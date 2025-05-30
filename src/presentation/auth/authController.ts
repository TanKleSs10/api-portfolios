import { Request, Response } from "express";
import { LoginUserDto } from "../../domain/dtos/auth/loginUser.dto";
import { LoginUseCase } from "../../domain/usecases/auth/login.usecase";
import { VerifyEmailUseCase } from "../../domain/usecases/auth/verifyEmail.usecase";
import { WinstonLogger } from "../../config/winstonConfig";
import { AuthRepository } from "../../domain/repositories/auth.repository";

export class AuthController {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly logger: WinstonLogger
    ) {}

    loginUser = (req:Request, res: Response) => {
            console.log(req.body)
            const [error, loginUserDto] = LoginUserDto.create(req.body);
            if(error) {
                this.logger.error("Error creating login dto", { error: error }, "AuthController");
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
                    this.logger.error("Error creating login", error, "AuthController");
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
            this.logger.error("Error verifying email", error, "AuthController");
            res.status(400).json({
                success: false,
                message: "Error al verificar el email",
                data: error
                });
        });
    }
}
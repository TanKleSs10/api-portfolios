import { LoginUserDto } from "../dtos/auth/loginUser.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthRepository {
    abstract loginUser(loginUserDto: LoginUserDto): Promise<UserEntity>;
    abstract sendValidationEmail(email: string, name: string): Promise<{success: boolean, token: unknown}>;
    abstract generateToken(payload: any): Promise<unknown>;
    abstract verifyEmail(token: string): Promise<UserEntity>;
    abstract encryptPassword(password: string): Promise<string>;
}
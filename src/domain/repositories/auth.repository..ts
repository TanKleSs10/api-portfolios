import { LoginUserDto } from "../dtos/auth/loginUser.dto";
import { UserResponseDto } from "../dtos/user/userResponseDto";

export abstract class AuthRepository {
    abstract loginUser(loginUserDto: LoginUserDto): Promise<{user: UserResponseDto, token: unknown}>;
    abstract sendValidationEmail(email: string, name: string): Promise<{success: boolean, token: unknown}>;
    abstract generateToken<T>(payload: any): Promise<T | null>;
    abstract verifyEmail(token: string): Promise<boolean>;
    abstract encryptPassword(password: string): Promise<string>;
}
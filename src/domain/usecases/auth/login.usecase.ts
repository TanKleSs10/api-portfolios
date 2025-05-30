import { LoginUserDto } from "../../dtos/auth/loginUser.dto";
import { UserResponseDto } from "../../dtos/user/userResponseDto";
import { AuthRepository } from "../../repositories/auth.repository";


export interface ILoginUseCase {
    execute(loginUserDto: LoginUserDto): Promise<UserResponseDto>;
}

export class LoginUseCase implements ILoginUseCase {
    
    constructor(private readonly authRepository: AuthRepository) {}
    
    execute(loginUserDto: LoginUserDto): Promise<UserResponseDto> {
        return this.authRepository.loginUser(loginUserDto);
    }
}
import { AuthRepository } from "../../repositories/auth.repository.";

export interface IVerifyEmailUseCase {
    execute(token: string): Promise<boolean>;
}

export class VerifyEmailUseCase implements IVerifyEmailUseCase {
    constructor(private readonly authRepository: AuthRepository) {}
    
    execute(token: string): Promise<boolean> {
        return this.authRepository.verifyEmail(token)
    }
}

import { UserDataSource } from "../../domain/datasources/user.datasource";
import { LoginUserDto } from "../../domain/dtos/auth/loginUser.dto";
import { UserResponseDto } from "../../domain/dtos/user/userResponseDto";
import { AuthRepository } from "../../domain/repositories/auth.repository.";
import { BcryptAdapter } from "../adapters/bcript.adapter";
import { JwtAdapter } from "../adapters/jwt.adapter";
import { MailerAdapter } from "../adapters/nodemailer.adapter";
import { MailTemplateManager } from "../mail/mailTemplateManager";

export class AuthRepositoryImp implements AuthRepository {
    constructor(
        public readonly jwtAdapter: JwtAdapter,
        public readonly cryptAdapter: BcryptAdapter,
        private readonly emailService: MailerAdapter,
        private readonly userDataSource: UserDataSource,
        private readonly mailTemplateManager: MailTemplateManager,
        private readonly webServiceUrl: string,
    ) {}
    
    encryptPassword(password: string): Promise<string> {
        return this.cryptAdapter.hash(password);
    }
    
    async loginUser(loginUserDto: LoginUserDto): Promise<{user: UserResponseDto, token: unknown}> {
        const user = await this.userDataSource.findUserByEmail(loginUserDto.email);
        if(!user) throw new Error("Bad Request: User not found.");
        
        const validatedPassword = await this.cryptAdapter.compare(loginUserDto.password, user.password);
        if(!validatedPassword) throw new Error("Bad Request: Invalid password.");
        
        const token = await this.jwtAdapter.generateToken({id: user.id});
        if(!token) throw new Error("Internal Server Error: Token generation failed.");
        
        return {
            user: UserResponseDto.fromEntity(user),
            token: token,
        }
    }

    async generateToken<T>(payload: any): Promise<T | null> {
        return await this.jwtAdapter.generateToken(payload);
    }
    
    async sendValidationEmail(email: string, name: string): Promise<{success: boolean, token: unknown}> {
        const token = await this.jwtAdapter.generateToken({email});
        if(!token) throw new Error("Internal Server Error: Token generation failed.");
        const link = `${this.webServiceUrl}/api/auth/verify/${token}`;
        const htmlTemplate = this.mailTemplateManager.verificationEmail(name, link);
        
        const options = {
            to: email,
            subject: "Verificación de Email",
            htmlBody: htmlTemplate,
        };

        const isSend = await this.emailService.sendMail(options);
        if(!isSend) throw new Error("Internal Server Error: Failed to send email.");
        return {success: true, token: token};
    }

    async verifyEmail(token: string): Promise<boolean> {
        const payload = await this.jwtAdapter.verifyToken(token);
        if(!payload) throw new Error("Unauthorized: Invalid token.");
        const {email} = payload as {email: string};
        if(!email) throw new Error("Internal Server Error: Email not in token.");
        const user = await this.userDataSource.findUserByEmail(email);
        if(!user) throw new Error("Internal Server Error: User not found.");
        const userVerified = await this.userDataSource.emailValidated(email);
        if(!userVerified) throw new Error("Internal Server Error: Email not validated.");
        return true
    }
}
import { UserDataSource } from "../../domain/datasources/user.datasource";
import { LoginUserDto } from "../../domain/dtos/auth/loginUser.dto";
import { UserEntity } from "../../domain/entities/user.entity";
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
    ) {}
    
    encryptPassword(password: string): Promise<string> {
        return this.cryptAdapter.hash(password);
    }
    
    async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const user = await this.userDataSource.findUserByEmail(loginUserDto.email);
        if(!user) throw new Error("Bad Request: User not found.");
        const validatedPassword = await this.cryptAdapter.compare(loginUserDto.password, user.password);
        if(!validatedPassword) throw new Error("Bad Request: Invalid password.");
        return user;
    }

    async generateToken(payload: any): Promise<unknown> {
        return await this.jwtAdapter.generateToken(payload);
    }
    
    async sendValidationEmail(email: string, name: string): Promise<{success: boolean, token: unknown}> {
        const token = await this.jwtAdapter.generateToken({email});
        if(!token) throw new Error("Internal Server Error: Token generation failed.");
        // TODO: create env Web service url
        const link = `http://localhost:3000/api/users/auth/verify/${token}`;
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

    async verifyEmail(token: string): Promise<UserEntity> {
        const payload = await this.jwtAdapter.verifyToken(token);
        if(!payload) throw new Error("Unauthorized: Invalid token.");
        const {email} = payload as {email: string};
        if(!email) throw new Error("Internal Server Error: Email not in token.");
        const user = await this.userDataSource.findUserByEmail(email);
        if(!user) throw new Error("Internal Server Error: User not found.");
        return this.userDataSource.emailValidated(email);
    }
}
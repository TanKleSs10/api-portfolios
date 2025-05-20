import { regularExps } from "../../../config/regular-exp";

export class LoginUserDto {
    constructor(
        public readonly email: string,
        public readonly password: string
    ){}

    static create(props: {[key: string]: any}): [string | undefined, LoginUserDto | undefined] {
        const { email, password } = props;

                if (!email || !password) { 
                    return ["No updates provided, missing name, email or password", undefined];
                }
        
                if( !regularExps.email.test(email) ) {
                    return ["Invalid email.", undefined];
                }
                
                if(password.length < 8) {
                    return ["Pasword too short.", undefined];
                }

        return [undefined, new LoginUserDto(email, password)];
    }
}
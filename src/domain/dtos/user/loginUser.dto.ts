export class LoginUserDto {
    constructor(
        public readonly email: string,
        public readonly password: string
    ){}

    static create(props: {[key: string]: any}): [string | undefined, LoginUserDto | undefined] {
        const { email, password } = props;

        if (!email || !password) {
            return ["Invalid user object.", undefined];
        }

        return [undefined, new LoginUserDto(email, password)];
    }
}
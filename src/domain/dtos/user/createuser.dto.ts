import { regularExps } from "../../../config/regular-exp";

export class CreateUserDto {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public rol: string = 'editor' // Valor por defecto 'editor'
    ){}

    static create(props: {[key: string]: any}): [string | undefined, CreateUserDto | undefined] {
        const { name, email, password, rol = 'editor' } = props; // Valor por defecto al desestructurar

        if (!name && !email && !password) { // Rol es opcional ahora
            return ["Invalid, missing name, email or password.", undefined];
        }

        if( email && !regularExps.email.test(email) ) {
            return ["Invalid email.", undefined];
        }

        if(password && password.length < 8) {
            return ["Pasword too short.", undefined];
        }

        return [undefined, new CreateUserDto(name, email, password, rol)];
    }
}
export class CreateUserDto {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public rol: string = 'editor' // Valor por defecto 'editor'
    ){}

    static create(props: {[key: string]: any}): [string | undefined, CreateUserDto | undefined] {
        const { name, email, password, rol = 'editor' } = props; // Valor por defecto al desestructurar

        if (!name || !email || !password) { // Rol es opcional ahora
            return ["Invalid user object.", undefined];
        }

        return [undefined, new CreateUserDto(name, email, password, rol)];
    }
}
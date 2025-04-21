export class UpdateUserDto {
    constructor(
        public readonly id: string,
        public readonly name?: string, // Propiedades opcionales
        public readonly email?: string,
        public readonly password?: string,
        public readonly rol?: string
    ){}

    get values(): {[key: string]: any} {
        const returnObj: {[key: string]: any} = {};
        if(this.name) returnObj.name = this.name;
        if(this.email) returnObj.email = this.email;
        if(this.password) returnObj.password = this.password;
        if(this.rol) returnObj.rol = this.rol;
        return returnObj;
    }

    static create(props: {[key: string]: any}): [string?, UpdateUserDto?] {
        const { id, name, email, password, rol } = props;

        if (!id) {
            return ["Invalid user id.", undefined];
        }

        if (!name && !email && !password && !rol) {
            return ["No updates provided.", undefined];
        }

        return [undefined, new UpdateUserDto(id, name, email, password, rol)];
    }
}
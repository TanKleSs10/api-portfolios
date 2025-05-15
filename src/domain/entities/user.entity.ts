export class UserEntity {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public emailValidated: boolean,
        public password: string,
        public rol: string = 'editor', // Valor por defecto 'editor'
        public createdAt?: Date,
        public updatedAt?: Date
    ){}

    public static fromObject(obj: any): UserEntity {
        const { id, _id, name, email, emailValidated, password, rol, createdAt, updatedAt } = obj;

        if(!id && !_id) {
            throw new Error("Missing id");
        }

        if (!name || !email || !password || !rol) {
            throw new Error("Invalid user object, missing name, email, password or rol");
        }

        if(emailValidated === undefined) {
            throw new Error("missing emailValidated");
        }

        return new UserEntity(
            (id || _id)?.toString(),
            name,
            email,
            emailValidated,
            password,
            rol !== undefined ? rol : 'editor',
            createdAt ? new Date(createdAt) : undefined,
            updatedAt ? new Date(updatedAt) : undefined
        );
    }
}
export class UserEntity {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public rol: string = 'editor', // Valor por defecto 'editor'
        public createdAt?: Date,
        public updatedAt?: Date
    ){}

    public static fromObject(obj: any): UserEntity {
        const { _id, id, name, email, password, rol, createdAt, updatedAt } = obj;

        if (!name || !email || !password) {
            throw new Error("Invalid user object.");
        }

        return new UserEntity(
            (_id || id)?.toString(),
            name,
            email,
            password,
            rol !== undefined ? rol : 'editor',
            createdAt ? new Date(createdAt) : undefined,
            updatedAt ? new Date(updatedAt) : undefined
        );
    }
}
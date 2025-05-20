export class TagEntity {
    constructor(
        public id: string,
        public name: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ){}

    public static fromObject(obj: any): TagEntity {
        const {_id, id, name, createdAt, updatedAt } = obj;

        if (!name) {
            throw new Error("Invalid tag object.");
        }

        return new TagEntity(
            ( _id || id)?.toString(),
            name,
            createdAt ? new Date(createdAt) : undefined,
            updatedAt ? new Date(updatedAt) : undefined
        );
    }
}
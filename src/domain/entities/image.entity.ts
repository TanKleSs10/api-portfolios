export class ImageEntity {
    constructor(
        public id: string,
        public name: string,
        public entityId: string,
        public entityType: string,
        public url: string,
        public alt: string = "",
        public isMain: boolean = false,
        public publicId: string = "",
        public createdAt?: Date,
        public updatedAt?: Date
    ) {}

    public static fromObject(obj: any): ImageEntity {
        const {
            _id,
            id,
            name,
            entityId,
            url,
            alt = "",
            isMain = false,
            createdAt,
            updatedAt,
            publicId = "",
            entityType
        } = obj;

        if (!entityId || !url) {
            throw new Error("Invalid image object: missing required fields.");
        }

        return new ImageEntity(
            (_id || id)?.toString(),
            name,
            entityId,
            entityType,
            url,
            alt,
            isMain,
            publicId,
            createdAt ? new Date(createdAt) : undefined,
            updatedAt ? new Date(updatedAt) : undefined
        );
    }
}

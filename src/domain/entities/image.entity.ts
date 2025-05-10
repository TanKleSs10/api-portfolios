export class ImageEntity {
    constructor(
        public id: string,
        public projectId: string,
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
            projectId,
            url,
            alt = "",
            isMain = false,
            createdAt,
            updatedAt,
            publicId = "",
        } = obj;

        if (!projectId || !url) {
            throw new Error("Invalid image object: missing required fields.");
        }

        return new ImageEntity(
            (_id || id)?.toString(),
            projectId,
            url,
            alt,
            isMain,
            publicId,
            createdAt ? new Date(createdAt) : undefined,
            updatedAt ? new Date(updatedAt) : undefined
        );
    }
}

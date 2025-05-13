export class PostEntity {
    constructor(
        public id: string,
        public title: string,
        public slug: string,
        public content: string,
        public images: string[] = [], // Contiene ids de las imagenes
        public tags: string[] = [], // Contiene ids de los tags
        public isPublic: boolean = false,
        public createdAt?: Date,
        public updatedAt?: Date,
    ){}

    public static fromObject(obj: any): PostEntity {
        const {
            id,
            _id,
            title,
            slug,
            content,
            images,
            tags,
            isPublic,
            createdAt,
            updatedAt,
        } = obj;
        
    if (!title || !slug || !content) {
        throw new Error("Invalid post object");
    }

    return new PostEntity(
        (_id || id)?.toString(),
        title,
        slug,
        content,
        Array.isArray(images) ? images : [],
        Array.isArray(tags) ? tags : [],
        isPublic,
        createdAt ? new Date(createdAt) : undefined,
        updatedAt ? new Date(updatedAt) : undefined,
    )}
}
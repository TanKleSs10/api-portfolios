export class ProjectEntity {
    constructor(
        public id: string,
        public slug: string,
        public title: string,
        public description: string,
        public portfolioType: "quantum-md" | "personal",
        public images: string[] = [], // Contiene ids de las imagenes
        public tags: string[] = [], // Contiene ids de los tags
        public isPublic: boolean = false,
        public repoUrl?: string,
        public demoUrl?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) {}

    public static fromObject(obj: any): ProjectEntity {
        const {
            _id,
            id,
            slug,
            title,
            description,
            portfolioType,
            images,
            tags,
            isPublic,
            repoUrl,
            demoUrl,
            createdAt,
            updatedAt,
        } = obj;

        if (!slug || !title || !portfolioType || !description ) {
            throw new Error("Invalid project object: missing required fields.");
        }

        const validTypes = ["quantum-md", "personal"];
        if (!validTypes.includes(portfolioType)) {
            throw new Error(`Invalid portfolio type: ${portfolioType}`);
        }

        return new ProjectEntity(
            (_id || id)?.toString(),
            slug,
            title,
            description,
            portfolioType,
            Array.isArray(images) ? images : [],
            Array.isArray(tags) ? tags : [],
            typeof isPublic === "boolean" ? isPublic : false,
            repoUrl,
            demoUrl,
            createdAt ? new Date(createdAt) : undefined,
            updatedAt ? new Date(updatedAt) : undefined
        );
    }
}
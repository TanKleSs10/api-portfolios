export class CreateProjectDto {
    constructor(
        public readonly title: string,
        public readonly description: string,
        public readonly portfolioType: "quantum-md" | "personal",
        public readonly mainImage?: string,
        public readonly images?: string[],
        public readonly tags?: string[],
        public readonly repoUrl?: string,
        public readonly demoUrl?: string,
        public readonly slug?: string,
        public readonly isPublic?: boolean
    ) {}

    static create(props: {[key: string]: any}): [string | undefined, CreateProjectDto | undefined] {
        const { title, description, portfolioType, mainImage, images, tags, repoUrl, demoUrl, slug, isPublic } = props;
        if (!title || !description || !portfolioType) {
            return ["Missing required fields.", undefined];
        }

        return [
            undefined,
            new CreateProjectDto(title, description, portfolioType, mainImage, images, tags, repoUrl, demoUrl, slug, isPublic ?? false),
        ];
    }
}

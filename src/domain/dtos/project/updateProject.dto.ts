export class UpdateProjectDto {
    constructor(
        public readonly id: string,
        public readonly title?: string,
        public readonly description?: string,
        public readonly slug?: string,
        public readonly portfolioType?: "quantum-md" | "personal"
    ) {}

    get values(): { [key: string]: any } {
        const returnObj: { [key: string]: any } = {};
        if (this.title) returnObj.title = this.title;
        if (this.description) returnObj.description = this.description;
        if (this.slug) returnObj.slug = this.slug;
        if (this.portfolioType) returnObj.portfolioType = this.portfolioType;
        return returnObj;
    }

    static create(props: { [key: string]: any }): [string | undefined, UpdateProjectDto | undefined] {
        const { id, title, description, slug, isPublic, portfolioType } = props;

        if (!id) {
            return ["Invalid project id.", undefined];
        }

        if (!title && !description && !slug && isPublic === undefined && !portfolioType) {
            return ["No updates provided.", undefined];
        }

        return [undefined, new UpdateProjectDto(id, title, description, slug, portfolioType)];
    }
}

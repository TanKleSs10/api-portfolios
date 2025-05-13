export class CreatePostDto {
    constructor(
        public title: string,
        public slug: string,
        public content: string,
        public tags?: string[],
        public isPublic?: boolean,
    ) {}

    static create(props: {[key: string]: any}): [string | undefined, CreatePostDto | undefined] {
        const {content, title, slug, tags, isPublic} = props;
        if (!content || !title || !slug ) {
            return ["invalid props", undefined];
        }
        return [undefined, new CreatePostDto(title, slug, content, tags, isPublic ?? false)];
    }    
}
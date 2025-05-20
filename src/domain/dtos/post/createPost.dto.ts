import { userInfo } from "os";

export class CreatePostDto {
    constructor(
        public title: string,
        public slug: string,
        public content: string,
        public user: string,
        public tags?: string[],
        public isPublic?: boolean,
    ) {}

    static create(props: {[key: string]: any}): [string | undefined, CreatePostDto | undefined] {
        const {content, title, slug, user, tags, isPublic} = props;
        
        if (!content || !title || !slug ) {
            return ["invalid props", undefined];
        }

        if (tags && !Array.isArray(tags)) {
            return ["invalid tags", undefined];
        }

        if(title && title.length > 100 || title.length < 2) {
            return ["invalid title", undefined];
        }

        if(content && content.length < 10) {
            return ["invalid content", undefined];
        }
        
        return [undefined, new CreatePostDto(title, slug, content, user, tags, isPublic ?? false)];
    }    
}
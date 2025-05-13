export class UpdatePostDto {
    constructor(
        public id: string,
        public title: string,
        public slug: string,
        public content: string,
        public tags?: string[],
        public isPublic?: boolean,
    ){}

    get values(): {[key: string]: any} {
        const returnObj: {[key: string]: any} = {};
        if (this.title) returnObj.title = this.title;
        if (this.slug) returnObj.slug = this.slug;
        if (this.content) returnObj.content = this.content;
        if (this.tags) returnObj.tags = this.tags;
        if (this.isPublic) returnObj.isPublic = this.isPublic;
        return returnObj;
    }
    static create(props: {[key: string]: any}): [string | undefined, UpdatePostDto | undefined] {
        const {id, content, title, slug, tags, isPublic} = props;

        if(!id) {
            return ["Invalid id", undefined]
        }

        if (!content && !title && !slug) {
            return ["No updates provided", undefined];
        }
        return [undefined, new UpdatePostDto(id, title, slug, content, tags, isPublic)];
    }
}
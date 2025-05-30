export class UpdatePostDto {
    constructor(
        public id: string,
        public title: string,
        public slug: string,
        public content: string,
        public userId: string,
        public user_role: "admin" | "editor",
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
        if (this.userId) returnObj.userId = this.userId;
        if (this.user_role) returnObj.user_role = this.user_role;
        return returnObj;
    }
    static create(props: {[key: string]: any}): [string | undefined, UpdatePostDto | undefined] {
        const {id, content, title, slug, tags, isPublic, userId, user_role} = props;

        if(!id) {
            return ["Invalid id", undefined]
        }

        if (!content && !title && !slug) {
            return ["No updates provided", undefined];
        }

        if(!userId) {
            return ["Invalid userId", undefined]
        }

        if(!user_role) {
            return ["Invalid user_role", undefined]
        }

        if(!["admin", "user"].includes(user_role)) {
            return ["Invalid user_role", undefined]
        }

        return [undefined, new UpdatePostDto(id, title, slug, content, userId, user_role, tags, isPublic ?? false)];
    }
}
export class CreateImageDto {
    constructor(
        public readonly projectId: string,
        public readonly name: string,
        public readonly publicId: string,
        public readonly url: string,
        public readonly isMain?: boolean,
        public readonly alt?: string,
    ) {}

    static create(props: { [key: string]: any }): [string | undefined, CreateImageDto | undefined] {
        const { projectId, name, publicId, url, isMain, alt } = props;   

        if (!projectId || !url) {
            return ["Invalid image object: missing required fields.", undefined];
        }

        return [undefined, new CreateImageDto(
            projectId,
            name,
            publicId,
            url,
            isMain ?? false,
            alt
        )];
    }
}
export class CreateImageDto {
    constructor(
        public readonly entityId: string,
        public readonly name: string,
        public readonly publicId: string,
        public readonly url: string,
        public readonly isMain?: boolean,
        public readonly alt?: string,
        public readonly entityType?: string
    ) {}

    static create(props: { [key: string]: any }): [string | undefined, CreateImageDto | undefined] {
        const { entityId, name, publicId, url, isMain, alt, entityType } = props;   

        if (!entityId || !url) {
            return ["Invalid image object: missing required fields.", undefined];
        }

        return [undefined, new CreateImageDto(
            entityId,
            name,
            publicId,
            url,
            isMain ?? false,
            alt,
            entityType
        )];
    }
}
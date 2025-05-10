export class UpdateImageDto {
    constructor(
        public readonly id: string,
        public readonly url: string,
        public readonly alt: string,
    ) {}

    public get values(): { [key: string]: any } {
        const returnObj: { [key: string]: any } = {};
        if (this.url) returnObj.url = this.url;
        if (this.alt) returnObj.alt = this.alt;
        return returnObj;
    }

    static create(props: { [key: string]: any }): [string | undefined, UpdateImageDto | undefined] {
        const { id, url, alt} = props;

        if (!id) {
            return ["Invalid image object: id is required.", undefined];
        }

        if (!url && !alt) {
            return ["Invalid image object: url or alt is required.", undefined];
        }

        return [undefined, new UpdateImageDto(id, url, alt)];
    }
}
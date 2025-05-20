export class UpdateImageDto {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly alt: string,
    ) {}

    public get values(): { [key: string]: any } {
        const returnObj: { [key: string]: any } = {};
        if (this.name) returnObj.name = this.name;
        if (this.alt) returnObj.alt = this.alt;
        return returnObj;
    }

    static create(props: { [key: string]: any }): [string | undefined, UpdateImageDto | undefined] {
        const { id, name, alt} = props;

        if (!id) {
            return ["Invalid image object: id is required.", undefined];
        }

        if (!name && !alt) {
            return ["Invalid image object: name or alt is required.", undefined];
        }

        return [undefined, new UpdateImageDto(id, name, alt)];
    }
}
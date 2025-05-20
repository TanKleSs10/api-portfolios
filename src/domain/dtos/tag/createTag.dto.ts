export class CreateTagDto {
    constructor(
        public name: string
    ){}

    static create(props: {[key: string]: any}): [string | undefined, CreateTagDto | undefined] {
        const { name } = props;
        if (!name) {
            return ["Invalid tag object.", undefined];
        }
        return [undefined, new CreateTagDto(name)];
    }
}
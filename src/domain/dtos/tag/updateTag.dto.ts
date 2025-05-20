export class UpdateTagDto {
    constructor(
        public id: string,
        public name: string
    ){}

    get values(): {[key: string]: any} {
        const returnObj: {[key: string]: any} = {};
        if(this.name) returnObj.name = this.name;
        return returnObj;
    }

    static create(props: {[key: string]: any}): [string | undefined, UpdateTagDto | undefined] {
        const { id, name } = props;
        if (!id) {
            return ["Invalid tag object.", undefined];
        }
        if (!name) {
            return ["Invalid tag object.", undefined];
        }
        return [undefined, new UpdateTagDto(id, name)];
    }
}
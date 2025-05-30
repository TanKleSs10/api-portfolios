import { UpdateTagDto } from "../../dtos/tag/updateTag.dto";
import { TagEntity } from "../../entities/tag.entity";
import { TagRepository } from "../../repositories/tag.repository";

export interface IUpdateTagUseCase {
    execute(updateTagDto: UpdateTagDto): Promise<TagEntity>;
}   

export class UpdateTagUseCase implements IUpdateTagUseCase {
    constructor(
        private readonly tagRepository: TagRepository
    ){}
    execute(updateTagDto: UpdateTagDto): Promise<TagEntity> {
        return this.tagRepository.updateTag(updateTagDto);
    }
}
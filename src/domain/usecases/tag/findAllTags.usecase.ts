import { TagEntity } from "../../entities/tag.entity";
import { TagRepository } from "../../repositories/tag.repository";

export interface IFindAllTagUseCase {
    execute(): Promise<TagEntity[]>;
} 

export class FindAllTagUseCase implements IFindAllTagUseCase {
    constructor(
        private readonly tagRepository: TagRepository
    ){}

    execute(): Promise<TagEntity[]> {
        return this.tagRepository.findAllTags();
    }
}   
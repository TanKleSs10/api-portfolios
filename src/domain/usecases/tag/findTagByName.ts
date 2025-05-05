import { TagEntity } from "../../entities/tag.entity";
import { TagRepository } from "../../repositories/tag.repository";

export interface IFindTagByNameUseCase {
    execute(email: string): Promise<TagEntity>;
} 

export class FindTagByNameUseCase implements IFindTagByNameUseCase {
    constructor(
        private readonly tagRepository: TagRepository
    ){}

    execute(name: string): Promise<TagEntity> {
        return this.tagRepository.findTagByName(name);
    }
}
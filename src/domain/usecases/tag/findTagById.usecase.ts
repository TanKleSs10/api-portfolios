import { TagEntity } from "../../entities/tag.entity";
import { TagRepository } from "../../repositories/tag.repository";

export interface IFindTagByIdUseCase {
    execute(id: string): Promise<TagEntity>;
} 

export class FindTagByIdUseCase implements IFindTagByIdUseCase {
    constructor(
        private readonly tagRepository: TagRepository
    ){}
    execute(id: string): Promise<TagEntity> {
        return this.tagRepository.findTagById(id);
    }
}
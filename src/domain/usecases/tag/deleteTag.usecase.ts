import { TagEntity } from "../../entities/tag.entity";
import { TagRepository } from "../../repositories/tag.repository";

export interface IDeleteTagUseCase {
    execute(id: string): Promise<TagEntity>;
} 

export class DeleteTagUseCase implements IDeleteTagUseCase {
    constructor(
        private readonly tagRepository: TagRepository
    ){}

    execute(id: string): Promise<TagEntity> {
        return this.tagRepository.deleteTag(id);
    }
} 
import { CreateTagDto } from "../../dtos/tag/createTag.dto";
import { TagEntity } from "../../entities/tag.entity";
import { TagRepository } from "../../repositories/tag.repository";

export interface ICreateTagUseCase {
    execute(createTagDto: CreateTagDto): Promise<TagEntity>;
} 

export class CreateTagUseCase implements ICreateTagUseCase {
    constructor(
        private readonly tagRepository: TagRepository,
    ){}

    execute(createTagDto: CreateTagDto): Promise<TagEntity> { 
         return this.tagRepository.createTag(createTagDto);
    }
}
import { CreateTagDto } from "../dtos/tag/createTag.dto";
import { UpdateTagDto } from "../dtos/tag/updateTag.dto";
import { TagEntity } from "../entities/tag.entity";

export abstract class TagRepository {
    abstract createTag(createTagDto: CreateTagDto): Promise<TagEntity>;
    abstract findTagById(id: string): Promise<TagEntity>;
    abstract findTagByName(name: string): Promise<TagEntity>;
    abstract findAllTags(): Promise<TagEntity[]>;
    abstract updateTag(updateTagDto: UpdateTagDto): Promise<TagEntity>;
    abstract deleteTag(id: string): Promise<TagEntity>;
}
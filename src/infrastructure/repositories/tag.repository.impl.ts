import { Types } from "mongoose";
import { TagDataSource } from "../../domain/datasources/tag.datasource";
import { CreateTagDto } from "../../domain/dtos/tag/createTag.dto";
import { UpdateTagDto } from "../../domain/dtos/tag/updateTag.dto";
import { TagEntity } from "../../domain/entities/tag.entity";
import { TagRepository } from "../../domain/repositories/tag.repository";

export class TagRepositoryImpl implements TagRepository {
    constructor(
        private readonly tagDataSource: TagDataSource
    ){}

    createTag(createTagDto: CreateTagDto): Promise<TagEntity> {
        return this.tagDataSource.createTag(createTagDto);
    }
    findTagById(id: string): Promise<TagEntity> {
        return this.tagDataSource.findTagById(id);
    }
    findTagByName(name: string): Promise<TagEntity> {
        return this.tagDataSource.findTagByName(name);
    }
    findAllTags(): Promise<TagEntity[]> {
        return this.tagDataSource.findAllTags();
    }
    updateTag(updateTagDto: UpdateTagDto): Promise<TagEntity> {
        if (!Types.ObjectId.isValid(updateTagDto.id)) {
            throw new Error("Invalid Tag ID.");
        }
        return this.tagDataSource.updateTag(updateTagDto);
    }
    deleteTag(id: string): Promise<TagEntity> {
        return this.tagDataSource.deleteTag(id);
    }
}
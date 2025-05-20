import { TagDataSource } from "../../domain/datasources/tag.datasource";
import { CreateTagDto } from "../../domain/dtos/tag/createTag.dto";
import { UpdateTagDto } from "../../domain/dtos/tag/updateTag.dto";
import { TagEntity } from "../../domain/entities/tag.entity";
import { TagRepository } from "../../domain/repositories/tag.repository";
import { ObjectIdValidator } from "../adapters/objectIdValidator.adapter";

export class TagRepositoryImpl implements TagRepository {
    constructor(
        private readonly tagDataSource: TagDataSource,
    ){}

    async createTag(createTagDto: CreateTagDto): Promise<TagEntity> {
        const existingTag = await this.tagDataSource.findTagByName(createTagDto.name);
        if (existingTag) {
            throw new Error("Tag with this name already exists.");
        }
        return this.tagDataSource.createTag(createTagDto);
    }

    async findTagById(id: string): Promise<TagEntity> {
            if (ObjectIdValidator.isValid(id) === false) {
                throw new Error("Invalid ID format.");
            }
            return this.tagDataSource.findTagById(id);
    }

    async findTagByName(name: string): Promise<TagEntity> {
        const tag = await this.tagDataSource.findTagByName(name);
        if (!tag) {
            throw new Error("Tag not found.");
        }
        return tag;
    }

    findAllTags(): Promise<TagEntity[]> {
        return this.tagDataSource.findAllTags();
    }

    updateTag(updateTagDto: UpdateTagDto): Promise<TagEntity> {
        if (ObjectIdValidator.isValid(updateTagDto.id) === false) {
            throw new Error("Invalid ID format.");
        }
        return this.tagDataSource.updateTag(updateTagDto);
    }

    deleteTag(id: string): Promise<TagEntity> {
        if (ObjectIdValidator.isValid(id) === false) {
            throw new Error("Invalid ID format.");
        }
        return this.tagDataSource.deleteTag(id);
    }
}
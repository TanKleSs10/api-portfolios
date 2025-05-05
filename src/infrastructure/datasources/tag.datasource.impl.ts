import { TagDataSource } from "../../domain/datasources/tag.datasource";
import { CreateTagDto } from "../../domain/dtos/tag/createTag.dto";
import { UpdateTagDto } from "../../domain/dtos/tag/updateTag.dto";
import { TagEntity } from "../../domain/entities/tag.entity";
import { tagModel } from "../models/tag/tagModel";

export class TagDataSourceImpl implements TagDataSource {
    async createTag(createTagDto: CreateTagDto): Promise<TagEntity> {
        const newTag = await tagModel.create(createTagDto);
        return TagEntity.fromObject(newTag.toObject());
    }
    async findTagById(id: string): Promise<TagEntity> {
        const tag = await tagModel.findById(id);
        if (!tag) {
            throw new Error("Tag not found.");
        }
        return TagEntity.fromObject(tag);
    }
    async findTagByName(name: string): Promise<TagEntity> {
        const tag = await tagModel.findOne({ name });
        if (!tag) {
            throw new Error("Tag not found.");
        }
        return TagEntity.fromObject(tag);
    }
    async findAllTags(): Promise<TagEntity[]> {
        const tags = await tagModel.find();
        return tags.map(tag => TagEntity.fromObject(tag));
    }
    async updateTag(updateTagDto: UpdateTagDto): Promise<TagEntity> {
        const tag = await tagModel.findByIdAndUpdate(
            updateTagDto.id,
            { $set: updateTagDto.values },
            { new: true, runValidators: true }
        );
        if (!tag) {
            throw new Error("Tag not found.");
        }
        return TagEntity.fromObject(tag.toObject());
    }
    async deleteTag(id: string): Promise<TagEntity> {
        const deletedTag = await tagModel.findByIdAndDelete(id);
        if (!deletedTag) {
            throw new Error("Tag not found.");
        }
        return TagEntity.fromObject(deletedTag.toObject());
    }

}
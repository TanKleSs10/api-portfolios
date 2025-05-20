import { WinstonLogger } from "../../config/winstonConfig";
import { TagDataSource } from "../../domain/datasources/tag.datasource";
import { CreateTagDto } from "../../domain/dtos/tag/createTag.dto";
import { UpdateTagDto } from "../../domain/dtos/tag/updateTag.dto";
import { TagEntity } from "../../domain/entities/tag.entity";
import { tagModel } from "../models/tag/tagModel";

export class TagDataSourceImpl implements TagDataSource {
    constructor(
        private readonly logger: WinstonLogger,
    ) {}

    async createTag(createTagDto: CreateTagDto): Promise<TagEntity> {
            const newTag = await tagModel.create(createTagDto);
            if (!newTag) {
                throw new Error("Internal Server Error: there was an error creating the tag.");
            }
            return TagEntity.fromObject(newTag.toObject());
    }

    async findTagById(id: string): Promise<TagEntity> {
        const tag = await tagModel.findById(id);
        if (!tag) {
            throw new Error("Tag not found.");
        }
        return TagEntity.fromObject(tag);
    }

    async findTagByName(name: string): Promise<TagEntity | null> {
            const tag = await tagModel.findOne({ name });
            return  tag ? TagEntity.fromObject(tag) : null; 
    }

    async findAllTags(): Promise<TagEntity[]> {
            const tags = await tagModel.find();
            if (!tags || tags.length === 0) {
                throw new Error("No tags found.");
            }
            return tags.map(tag => TagEntity.fromObject(tag));
    }

    async updateTag(updateTagDto: UpdateTagDto): Promise<TagEntity> {
            const tag = await tagModel.findByIdAndUpdate(
                updateTagDto.id,
                { $set: updateTagDto.values },
                { new: true, runValidators: true }
            );
            if (!tag) {
                throw new Error("Tag not found for update.");
            }
            return TagEntity.fromObject(tag.toObject());
    }

    async deleteTag(id: string): Promise<TagEntity> {
            const deletedTag = await tagModel.findByIdAndDelete(id);
            if (!deletedTag) {
                this.logger.warn("Tag not found for deletion", { id }, "TagDataSourceImpl");
                throw new Error("Tag not found for deletion.");
            }
            return TagEntity.fromObject(deletedTag.toObject());
    }
}
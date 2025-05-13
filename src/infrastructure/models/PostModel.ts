import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { ImageModel } from "./ImageModel";
import { TagModel } from "./tag/tagModel";

@modelOptions({
    schemaOptions: {
        timestamps: true,
        collection: "posts",
    },
})
export class PostModel {
    @prop({ required: true, lowercase: true, trim: true })
    title!: string;

    @prop({ required: true, trim: true, lowercase: true, unique: true })
    slug!: string;

    @prop({ required: true, trim: true })
    content!: string;

    @prop({ref: () => ImageModel, default: []})
    images?: Ref<ImageModel>[];

    @prop({ type: () => [Types.ObjectId], ref: 'TagModel', default: [] })
    tags?: Ref<TagModel>[];

    @prop({default: false}) 
    isPublic!: boolean;
}

export const postModel = getModelForClass(PostModel);
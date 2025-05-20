import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { ProjectModel } from "./ProjectModel";

export enum EntityType {
    Project = "ProjectModel",
    Post = "PostModel"
  }  

@modelOptions({
    schemaOptions: {
        timestamps: true,
        collection: "images",
    },
})
export class ImageModel {
    @prop({
        required: true,
        trim: true,
        minlength: 2,
        lowercase: true,
    })
    name!: string;

    @prop({ required: true })
    publicId!: string;

    @prop({
        trim: true,
        minlength: 2,
        lowercase: true,
    })
    alt!: string;

    @prop({
        required: true,
        trim: true,
    })
    url!: string;

    @prop({required: true, enum: ["projectModel", "postModel"]})
    entityType!: EntityType;

    @prop({ refPath: "entityType"})
    entityId!: Ref<ProjectModel> | string;

    @prop({ default: false })
    isMain?: boolean;
}

export const imageModel = getModelForClass(ImageModel);
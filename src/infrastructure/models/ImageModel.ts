import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { ProjectModel } from "./ProjectModel";

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
    })
    alt!: string;

    @prop({
        required: true,
        trim: true,
    })
    url!: string;

    @prop({ ref: () => ProjectModel })
    projectId!: Ref<ProjectModel>;

    @prop({ default: false })
    isMain?: boolean;
}

export const imageModel = getModelForClass(ImageModel);
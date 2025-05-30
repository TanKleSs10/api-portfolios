import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { ImageModel } from "./ImageModel";
import { TagModel } from "./tag/tagModel";
import { Types } from "mongoose";


@modelOptions({
    schemaOptions: {
        timestamps: true,
        collection: "projects",
    },
})
export class ProjectModel {
    @prop({
        required: true,
        trim: true,
        minlength: 2,
        unique: true, // cada proyecto debe tener un slug único
        lowercase: true,
    })
    slug!: string; // ej: "quantum-md" o "personal-portfolio"

    @prop({
        required: true,
        trim: true,
        minlength: 2,
        lowercase: true,
        unique: true,
    })
    title!: string;

    @prop({ lowercase: true })
    description?: string;

    @prop({ ref: "ImageModel", default: [] })
    images?: Ref<ImageModel>[];

    @prop({ type: () => [Types.ObjectId], ref: 'TagModel', default: [] })
    tags?: Ref<TagModel>[];

    @prop({
        trim: true,
    })
    repoUrl?: string;

    @prop({
        trim: true,
    })
    demoUrl?: string;

    @prop({
        enum: ["quantum-md", "personal"],
        required: true,
    })
    portfolioType!: string; // identifica a qué portafolio pertenece

    @prop({
        type: () => Boolean,
        default: false,
    })
    isPublic!: boolean;
}

export const projectModel = getModelForClass(ProjectModel);
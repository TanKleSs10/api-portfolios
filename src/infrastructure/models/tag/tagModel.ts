import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
    schemaOptions: { 
        timestamps: true,
        collection: "tags",
    },
})
class TagModel {
    @prop({
        required: true,
        trim: true,
        minlength: 2,
        lowercase: true,
        unique: true
    })
    name!: string;
}

export const tagModel = getModelForClass(TagModel);
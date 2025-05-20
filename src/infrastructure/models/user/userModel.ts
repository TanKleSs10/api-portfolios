import { prop, modelOptions, getModelForClass } from "@typegoose/typegoose";

enum Role {
    ADMIN = "admin",
    EDITOR = "editor",
}

@modelOptions({
    schemaOptions: {
        timestamps: true,
        collection: "users",
    },
})
export class UserModel {
    @prop({
        required: true,
        trim: true,
        lowercase: true
    })
    name!: string;

    @prop({
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Regex de email
    })
    email!: string;

    @prop({default: false})
    emailValidated!: boolean;

    @prop({
        required: true,
        minlength: 8,
    })
    password!: string;

    @prop({
        enum: Role,
        default: Role.EDITOR,
        set: (val: Role) => val.toLowerCase() as Role, // Convertir a minúsculas antes de guardar
    })
    rol!: Role;
}

export const userModel = getModelForClass(UserModel);
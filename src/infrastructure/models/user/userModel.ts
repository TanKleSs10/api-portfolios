import { prop, modelOptions, getModelForClass } from "@typegoose/typegoose";

enum Role {
    ADMIN = "admin",
    EDITOR = "editor",
}

@modelOptions({
    schemaOptions: {
        timestamps: true,
        collection: "users",
        versionKey: false, // Evita que se agregue "__v"
    },
})
class UserModel {
    @prop({
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
        set: (val: string) => val.toLowerCase(), // Convertir a minúsculas antes de guardar
    })
    name!: string;

    @prop({
        required: true,
        unique: true,
        lowercase: true, // Ya está en minúsculas
        trim: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Regex de email
    })
    email!: string;

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
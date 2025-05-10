import { get } from "env-var";


export const envs = {
    MONGODB_URI: get("MONGODB_URI").required().asString(),
    PORT: get("PORT").required().asPortNumber(),
    ENV: get("ENV").required().asString(),
    CLOUDINARY_CLOUD_NAME: get("CLOUDINARY_CLOUD_NAME").required().asString(),
    CLOUDINARY_API_KEY: get("CLOUDINARY_API_KEY").required().asString(),
    CLOUDINARY_API_SECRET: get("CLOUDINARY_API_SECRET").required().asString(),
};
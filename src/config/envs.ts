import { get } from "env-var";


export const envs = {
    ENV: get("ENV").required().asString(),
    PORT: get("PORT").required().asPortNumber(),
    MONGODB_URI: get("MONGODB_URI").required().asString(),
    WEBSERVICE_URL: get("WEBSERVICE_URL").required().asString(),
    IS_SENT_EMAIL: get("IS_SENT_EMAIL").default("false").asBool(),
    
    CLOUDINARY_CLOUD_NAME: get("CLOUDINARY_CLOUD_NAME").required().asString(),
    CLOUDINARY_API_KEY: get("CLOUDINARY_API_KEY").required().asString(),
    CLOUDINARY_API_SECRET: get("CLOUDINARY_API_SECRET").required().asString(),
    
    JWT_SEED: get("JWT_SEED").required().asString(),

    MAILER_EMAIL: get("MAILER_EMAIL").required().asString(),
    MAILER_SECRET: get("MAILER_SECRET").required().asString(),
    MAILER_SERVICE: get("MAILER_SERVICE").required().asString(),
};
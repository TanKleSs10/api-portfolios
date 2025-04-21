import { get } from "env-var";


export const envs = {
    MONGODB_URI: get("MONGODB_URI").required().asString(),
    PORT: get("PORT").required().asPortNumber(),
    ENV: get("ENV").required().asString(),
};
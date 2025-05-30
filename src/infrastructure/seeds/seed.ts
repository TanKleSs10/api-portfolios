import { DbConfig } from "../../config/dbConfig";
import { envs } from "../../config/envs";
import { WinstonLogger } from "../../config/winstonConfig";


const logger = new WinstonLogger()
const mongoDB = new DbConfig({
    MONGODB_URI: envs.MONGODB_URI,
    logger: logger
});

(async () => {
    mongoDB.dbConnection()

    main();

    mongoDB.dbDisconnect();
})();

async function main() {

    await Promise.all([]);

}
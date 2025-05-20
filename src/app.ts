import { DbConfig } from "./config/dbConfig";
import { envs } from "./config/envs";
import { WinstonLogger } from "./config/winstonConfig";

import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

function main() {

  const logger = new WinstonLogger();
  const db = new DbConfig({
    MONGODB_URI: envs.MONGODB_URI,
    logger
  });
  
  db.dbConnection();

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.router,
    logger
  });

  server.start();
}
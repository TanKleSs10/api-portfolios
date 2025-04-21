import express, { Router } from "express";
import { LoggerInterface } from "../infrastructure/logger/winstonLogger.adapter";

interface Options {
    port: number;
    routes: Router;
    logger: LoggerInterface;
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly routes: Router;
    private readonly logger: LoggerInterface;
    
    constructor(
        options: Options
    ){
        const { port, routes, logger } = options;
        this.port = port;
        this.routes = routes;
        this.logger = logger;
    }

    async start() {
        //* Middlewares
        this.app.use( express.json() ); // raw
        this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded
        
        //* Routes
        this.app.use(this.routes);

        // Start server
        this.app.listen(this.port, () => {
            this.logger.info(`Server running on http://localhost:${this.port}`);
        });
        
    }
}
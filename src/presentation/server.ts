import express, { Router } from "express";
import { LoggerInterface } from "../infrastructure/logger/winstonLogger.adapter";
import http from "http";

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
    private server?: http.Server;
    
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
        this.server = this.app.listen(this.port, () => {
            this.logger.info(`Server running on http://localhost:${this.port}`);
        });
        
    }

    getApp(): express.Express {
        return this.app;
      }
    
      /** Para cerrar el servidor en afterAll */
      async stop() {
        if (!this.server) return;
        await new Promise<void>((resolve, reject) => {
          this.server!.close(err => (err ? reject(err) : resolve()));
        });
      }
}
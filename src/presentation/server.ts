import express, { Router } from "express";

interface Options {
    port: number;
    routes: Router;
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly routes: Router;
    
    constructor(
        options: Options
    ){
        const { port, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    async start() {
        //* Middlewares
        this.app.use( express.json() ); // raw
        this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded
        
        //* Routes
        this.routes.use(this.routes);

        // Start server
        this.app.listen(this, () => {
            console.log(`Server running on port ${this.port}`);
        });
        
    }
}
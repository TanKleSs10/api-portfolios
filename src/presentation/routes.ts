import { Router } from "express";

export class AppRoutes {
    
    static get router() {
        const router = Router();
        
        router.get("/", (req, res) => {
            res.send("Hello World!");
        });

        return router;
    }

}
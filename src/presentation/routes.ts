import { Router } from "express";
import { UserRoutes } from "./user/userRoutes";

export class AppRoutes {
    
    static get router() {
        const router = Router();
        
        router.use("/api/users", UserRoutes.routes);

        return router;
    }

}
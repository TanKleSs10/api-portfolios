import { Router } from "express";
import { UserRoutes } from "./user/userRoutes";
import { TagRoutes } from "./tag/tagRoutes";

export class AppRoutes {
    
    static get router() {
        const router = Router();
        
        router.use("/api/users", UserRoutes.routes);
        router.use("/api/tags", TagRoutes.routes);

        return router;
    }

}
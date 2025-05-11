import { Router } from "express";
import { UserRoutes } from "./user/userRoutes";
import { TagRoutes } from "./tag/tagRoutes";
import { ProjectRoutes } from "./project/projectRoutes";
import { ImageRoutes } from "./image/imageRoutes";

export class AppRoutes {
    
    static get router() {
        const router = Router();
        
        router.use("/api/users", UserRoutes.routes);
        router.use("/api/tags", TagRoutes.routes);
        router.use("/api/projects", ProjectRoutes.routes);
        router.use("/api/:entityType/:entityId/images", ImageRoutes.routes);

        return router;
    }

}
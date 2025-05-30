import { Router } from "express";
import { UserRoutes } from "./user/userRoutes";
import { TagRoutes } from "./tag/tagRoutes";
import { ProjectRoutes } from "./project/projectRoutes";
import { ImageRoutes } from "./image/imageRoutes";
import { PostRoutes } from "./post/postRoutes";
import { AuthRoutes } from "./auth/authRoutes";
import { LeadRoutes } from "./lead/leadRoutes";

export class AppRoutes {
    
    static get router() {
        const router = Router();
        
        router.use("/api/users", UserRoutes.routes);
        router.use("/api/tags", TagRoutes.routes);
        router.use("/api/projects", ProjectRoutes.routes);
        router.use("/api/:entityType/:entityId/images", ImageRoutes.routes);
        router.use("/api/posts", PostRoutes.routes);
        router.use("/api/auth", AuthRoutes.routes);
        router.use("/api/leads", LeadRoutes.routes); // Assuming lead routes are under auth

        return router;
    }

}
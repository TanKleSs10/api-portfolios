import { Router } from "express";
import { container } from "../../config/di.container";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class PostRoutes {
    static get routes(){
        const router = Router();

        // Middlewares
        router.use([AuthMiddleware.validateToken]);
        
        const postController = container.postController;

        router.post("/", AuthMiddleware.authorizeRoles("admin", "editor"), postController.createPost);
        router.get("/", AuthMiddleware.authorizeRoles("admin", "editor"), postController.getAllPost);
        router.get("/:id", AuthMiddleware.authorizeRoles("admin", "editor"), postController.getPostById);
        router.put("/:id", AuthMiddleware.authorizeRoles("admin", "editor"),postController.updatePost);
        router.delete("/:id", AuthMiddleware.authorizeRoles("admin"), postController.deletePost);

        return router;
    }
}
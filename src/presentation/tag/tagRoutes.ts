import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { container } from "../../config/di.container";

export class TagRoutes {
    
    static get routes() {
        const router = Router(); 
        
        // Middlewares
        router.use([AuthMiddleware.validateToken, AuthMiddleware.authorizeRoles("admin")]);
        
        const tagController = container.tagController;

        router.get("/", tagController.getTags);
        router.get("/:id", tagController.getTagById);
        router.get("/:name", tagController.getTagByName);
        router.post("/", tagController.createTag);
        router.put("/:id", tagController.updateTag);
        router.delete("/:id", tagController.deleteTag);
        
        return router;
    }
}
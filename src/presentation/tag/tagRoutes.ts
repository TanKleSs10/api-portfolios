import { Router } from "express";
import { container } from "../../config/di.container";

export class TagRoutes {
    
    static get routes() {
        const router = Router(); 
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
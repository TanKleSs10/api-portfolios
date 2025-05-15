import { Router } from "express";
import { container } from "../../config/di.container";

export class PostRoutes {
    static get routes(){
        const router = Router();
        const postController = container.postController;

        router.post("/", postController.createPost);
        router.get("/", postController.getAllPost);
        router.get("/:id", postController.getPostById);
        router.put("/:id", postController.updatePost);
        router.delete("/:id", postController.deletePost);

        return router;
    }
}
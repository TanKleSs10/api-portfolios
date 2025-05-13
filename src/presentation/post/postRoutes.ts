import { Router } from "express";
import { PostDataSourceImpl } from "../../infrastructure/datasources/post.datasource.impl";
import { PostRepositoryImpl } from "../../infrastructure/repositories/post.repository.impl";
import { PostController } from "./postController";

export class PostRoutes {
    static get routes(){
        const router = Router();

        const postDataSource = new PostDataSourceImpl();
        const postRepository = new PostRepositoryImpl(postDataSource);
        const postController = new PostController(postRepository);

        router.post("/", postController.createPost);
        router.get("/", postController.getAllPost);
        router.get("/:id", postController.getPostById);
        router.put("/:id", postController.updatePost);
        router.delete("/:id", postController.deletePost);

        return router;
    }
}
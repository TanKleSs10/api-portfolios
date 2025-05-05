import { Router } from "express";
import { TagController } from "./tagController";
import { TagRepositoryImpl } from "../../infrastructure/repositories/tag.repository.impl";
import { TagDataSourceImpl } from "../../infrastructure/datasources/tag.datasource.impl";

export class TagRoutes {
    
    static get routes() {
        const router = Router();

        const tagDataSource = new TagDataSourceImpl();
        const tagRepository = new TagRepositoryImpl(tagDataSource);
        const tagController = new TagController(tagRepository);

        router.get("/", tagController.getTags);
        router.get("/:id", tagController.getTagById);
        router.get("/:name", tagController.getTagByName);
        router.post("/", tagController.createTag);
        router.put("/:id", tagController.updateTag);
        router.delete("/:id", tagController.deleteTag);
        
        return router;
    }
}
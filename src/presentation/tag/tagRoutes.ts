import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { container } from "../../config/di.container";
import { body, param } from "express-validator";
import { ValidatorMiddleware } from "../middlewares/validator.middleware";

export class TagRoutes {
    
    static get routes() {
        const router = Router(); 
        

        
        const tagController = container.tagController;

        // Routes Public
        router.get("/", tagController.getTags);
        router.get("/:id", 
            param("id").isMongoId().withMessage("Invalid tag id"),
            ValidatorMiddleware.validateRequest,
            tagController.getTagById
        );
        router.get("/:name",
            param("name").isString().withMessage("Invalid tag name"),
            ValidatorMiddleware.validateRequest,
            tagController.getTagByName,
        );

        // Routes Private
        router.post("/", 
            body("name").isString().withMessage("Invalid tag name"),
            ValidatorMiddleware.validateRequest,
            AuthMiddleware.validateToken,
            AuthMiddleware.authorizeRoles("admin", "editor"),
            tagController.createTag);
        router.put("/:id", 
            param("id").isMongoId().withMessage("Invalid tag id"),
            body("name").isString().withMessage("Invalid tag name"),
            ValidatorMiddleware.validateRequest,
            AuthMiddleware.validateToken,
            AuthMiddleware.authorizeRoles("admin", "editor"),
            tagController.updateTag);
        router.delete("/:id",
            param("id").isMongoId().withMessage("Invalid tag id"),
            ValidatorMiddleware.validateRequest,
            AuthMiddleware.validateToken,
            AuthMiddleware.authorizeRoles("admin", "editor"),
            tagController.deleteTag);
        
        return router;
    }
}
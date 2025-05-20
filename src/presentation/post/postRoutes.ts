import { Router } from "express";
import { container } from "../../config/di.container";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { body } from "express-validator";
import { ValidatorMiddleware } from "../middlewares/validator.middleware";

export class PostRoutes {
    static get routes(){
        const router = Router();

        // Middlewares
        router.use([AuthMiddleware.validateToken]);
        
        const postController = container.postController;

        router.post("/", 
            body("title").isString().withMessage("Invalid title"),
            body("content").isString().withMessage("Invalid content"),
            body("tags").isArray().withMessage("Invalid tags").optional(),
            [AuthMiddleware.authorizeRoles("admin", "editor"),
            ValidatorMiddleware.validateRequest],
            postController.createPost
        );
        router.get("/", 
            AuthMiddleware.authorizeRoles("admin", "editor"), 
            postController.getAllPost
        );
            router.get("/:id",
            body("id").isMongoId().withMessage("Invalid post id"), 
            [AuthMiddleware.authorizeRoles("admin", "editor"),
            ValidatorMiddleware.validateRequest], 
            postController.getPostById
        );
            router.put("/:id",
            body("id").isMongoId().withMessage("Invalid post id"),
            body("title").isString().withMessage("Invalid title"),
            body("content").isString().withMessage("Invalid content"),
            body("tags").isArray().withMessage("Invalid tags").optional(),
            [AuthMiddleware.authorizeRoles("admin", "editor"),
            ValidatorMiddleware.validateRequest],
            postController.updatePost
        );
            router.delete("/:id", 
            body("id").isMongoId().withMessage("Invalid post id"),
            [AuthMiddleware.authorizeRoles("admin"),
            ValidatorMiddleware.validateRequest], 
            postController.deletePost
        );

        return router;
    }
}
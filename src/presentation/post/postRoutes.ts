import { Router } from "express";
import { container } from "../../config/di.container";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { body } from "express-validator";
import { ValidatorMiddleware } from "../middlewares/validator.middleware";

export class PostRoutes {
    static get routes(){
        const router = Router();
        
        const postController = container.postController;

        router.get("/", 
            postController.getAllPost
        );

        router.get("/:id",
            body("id").isMongoId().withMessage("Invalid post id"), 
            postController.getPostById
        );

        router.post("/", 
            body("title").isString().withMessage("Invalid title"),
            body("content").isString().withMessage("Invalid content"),
            body("tags").isArray().withMessage("Invalid tags").optional(),
            [AuthMiddleware.validateToken,
            AuthMiddleware.authorizeRoles("admin", "editor"),
            ValidatorMiddleware.validateRequest],
            postController.createPost
        );

        router.put("/:id",
            body("id").isMongoId().withMessage("Invalid post id"),
            body("title").isString().withMessage("Invalid title"),
            body("content").isString().withMessage("Invalid content"),
            body("tags").isArray().withMessage("Invalid tags").optional(),
            [AuthMiddleware.validateToken,
            AuthMiddleware.authorizeRoles("admin", "editor"),
            ValidatorMiddleware.validateRequest],
            postController.updatePost
        );
            router.delete("/:id", 
            body("id").isMongoId().withMessage("Invalid post id"),
            [AuthMiddleware.validateToken,
            AuthMiddleware.authorizeRoles("admin", "editor"),
            ValidatorMiddleware.validateRequest], 
            postController.deletePost
        );

        return router;
    }
}
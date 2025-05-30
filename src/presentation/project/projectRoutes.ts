import { Router } from "express";
import { container } from "../../config/di.container";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { body, param } from "express-validator";

export class ProjectRoutes {
 
    static get routes() {
        const router = Router();
        
        // Middlewares
        router.use([AuthMiddleware.validateToken, AuthMiddleware.authorizeRoles("admin")]);

        const projectController = container.projectController;
        // routes public
        router.get("/", projectController.getAllProjects);
        router.get("/:portfolioType/:slug", 
            param("portfolioType").isIn(["quantum-md", "personal"]).withMessage("Invalid portfolio type"),
            param("slug").isString().withMessage("Invalid slug"),
            AuthMiddleware.validateToken,
            projectController.getProjectBySlugAndType);
        
        // routes private
        router.post("/", 
            body("title").isString().withMessage("Title is required"),
            body("description").isString().withMessage("Description is required"),
            body("portfolioType").isIn(["quantum-md", "personal"]).withMessage("Invalid portfolio type"),
            AuthMiddleware.validateToken,
            AuthMiddleware.authorizeRoles("admin"),
            projectController.createProject);

        router.put("/:id", 
            param("id").isMongoId().withMessage("Invalid project id"),
            body("title").isString().withMessage("Title is required"),
            body("description").isString().withMessage("Description is required"),
            body("portfolioType").isIn(["quantum-md", "personal"]).withMessage("Invalid portfolio type"),
            AuthMiddleware.validateToken,
            AuthMiddleware.authorizeRoles("admin"),
            projectController.updateProject
        );
        
        router.delete("/:id", 
            param("id").isMongoId().withMessage("Invalid project id"),
            AuthMiddleware.validateToken,
            AuthMiddleware.authorizeRoles("admin"),
            projectController.deleteProject);

        return router;
 }

}
import { Router } from "express";
import { container } from "../../config/di.container";

export class ProjectRoutes {
 
    static get routes() {
        const router = Router();
        const projectController = container.projectController;

        router.post("/", projectController.createProject);
        router.get("/", projectController.getAllProjects);
        router.get("/:portfolioType/:slug", projectController.getProjectBySlugAndType);
        router.put("/:id", projectController.updateProject);
        router.delete("/:id", projectController.deleteProject);

        return router;
 }

}
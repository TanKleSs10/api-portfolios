import { Router } from "express";
import { ProjectDataSourceImpl } from "../../infrastructure/datasources/project.datasource.impl";
import { ProjectRepositoryImpl } from "../../infrastructure/repositories/project.repository.impl";
import { ProjectController } from "./projectController";

export class ProjectRoutes {
 
    static get routes() {
        const router = Router();

        const projectDatasource = new ProjectDataSourceImpl();
        const projectRepository = new ProjectRepositoryImpl(projectDatasource);
        const projectController = new ProjectController(projectRepository);

        router.post("/", projectController.createProject);
        router.get("/", projectController.getAllProjects);
        router.get("/:portfolioType/:slug", projectController.getProjectBySlugAndType);
        router.put("/:id", projectController.updateProject);
        router.delete("/:id", projectController.deleteProject);

        return router;
 }

}
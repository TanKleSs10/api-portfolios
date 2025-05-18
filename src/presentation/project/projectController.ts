import { Request, Response } from "express";
import { ProjectRepository } from "../../domain/repositories/project.repository";
import { CreateProjectUseCase } from "../../domain/usecases/project/createProject.usecase";
import { CreateProjectDto } from "../../domain/dtos/project/createProject.dto";
import { FindAllProjectsUseCase } from "../../domain/usecases/project/findAllProjects.usecase";
import { FindProjectBySlugAndTypeUseCase } from "../../domain/usecases/project/FindProjectBySlugAndType.usecase";
import { UpdateProjectDto } from "../../domain/dtos/project/updateProject.dto";
import { UpdateProjectUseCase } from "../../domain/usecases/project/updateProject.usecase";
import { DeleteProjectUseCase } from "../../domain/usecases/project/deleteProject.usecase";
import { QueryParamsDto } from "../../domain/dtos/project/queryParams.dto";

export class ProjectController {
    constructor(private readonly projectRepository: ProjectRepository) {}

    public createProject = (req: Request, res: Response) => {
        // crea el slug con base al titulo y quita espacios
        req.body.slug = req.body.title.replace(/\s+/g, "-").toLowerCase();
        const [error, createProjectDto] = CreateProjectDto.create(req.body);
        if(error){
            res.status(400).json({
                success: false,
                message: "Error al crear proyecto",
                data: error
            });
        }else{
            new CreateProjectUseCase(this.projectRepository).execute(createProjectDto!).then(project => {
                res.status(201).json({
                    success: true,
                    message: "Proyecto creado correctamente",
                    data: project
                });
            }).catch((error) => {
                res.status(500).json({
                    success: false,
                    message: "Error al crear proyecto",
                    data: error
                });
            });
        }
    }

    public getAllProjects = (req: Request, res: Response) => {
        const { portfolioType, tags, page, search, limit } = req.query;
        const [error, queryParams] = QueryParamsDto.create({ portfolioType, tags, page, search, limit });
        if(error){
            res.status(400).json({
                success: false,
                message: "Error al obtener proyectos",
                data: error
            });
        }else{
            new FindAllProjectsUseCase(this.projectRepository).execute(queryParams)
            .then(({ projects, pagination }) => {
                res.status(200).json({
                    successs: true,
                    message: "Proyectos obtenidos correctamente",
                    data: projects,
                    pagination: pagination
                });
            })
            .catch((error) => {
                console.error("Error al obtener proyectos:", error);
                res.status(500).json({
                    successs: false,
                    message: "Error interno al obtener proyectos",
                    error: error.message || error
                });
            });
        }
    }


    // No se usará TODO: eliminar
    public getProjectBySlugAndType = (req: Request, res: Response) => {
        const { portfolioType, slug } = req.params;
        new FindProjectBySlugAndTypeUseCase(this.projectRepository).execute(slug, portfolioType as "quantum-md" | "personal").then(project => {
            res.status(200).json(project);
        }).catch((error) => {
            res.status(400).json(error);
        });
    }

    public updateProject = (req: Request, res: Response) => {
        const { id } = req.params;
        console.log(req.body);
        const [error, updateProjectDto] = UpdateProjectDto.create({ id, ...req.body });
        if(error){
            res.status(400).json(error);
        }else{
            new UpdateProjectUseCase(this.projectRepository).execute(updateProjectDto!).then(project => {
                res.status(200).json({
                    success: true,
                    message: "Proyecto actualizado correctamente",
                    data: project
                });
            }).catch((error) => {
                res.status(400).json({
                    success: false,
                    message: "Error al actualizar proyecto",
                    data: error
                });
            });
        }
    }

    public deleteProject = (req: Request, res: Response) => {
        const { id } = req.params;
        new DeleteProjectUseCase(this.projectRepository).execute(id).then(project => {
            res.status(200).json({
                success: true,
                message: "Proyecto eliminado correctamente",
                data: project
            });
        }).catch((error) => {
            res.status(400).json({
                success: false,
                message: "Error al eliminar proyecto",
                data: error
            });
        });
    }
}
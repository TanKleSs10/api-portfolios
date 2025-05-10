import { Request, Response } from "express";
import { ProjectRepository } from "../../domain/repositories/project.repository";
import { CreateProjectUseCase } from "../../domain/usecases/project/createProject.usecase";
import { CreateProjectDto } from "../../domain/dtos/project/createProject.dto";
import { FindAllProjectUseCase } from "../../domain/usecases/project/findAllProjects.usecase";
import { FindProjectBySlugAndTypeUseCase } from "../../domain/usecases/project/FindProjectBySlugAndType.usecase";
import { UpdateProjectDto } from "../../domain/dtos/project/updateProject.dto";
import { UpdateProjectUseCase } from "../../domain/usecases/project/updateProject.usecase";
import { DeleteProjectUseCase } from "../../domain/usecases/project/deleteProject.usecase";
import { Filters} from "../../domain/usecases/project/findAllProjects.usecase";

export class ProjectController {
    constructor(private readonly projectRepository: ProjectRepository) {}

    public createProject = (req: Request, res: Response) => {
        // crea el slug con base al titulo y quita espacios
        req.body.slug = req.body.title.replace(/\s+/g, "-").toLowerCase();
        const [error, createProjectDto] = CreateProjectDto.create(req.body);
        if(error){
            res.status(400).json({
                succes: false,
                message: "Error al crear proyecto",
                data: error
            });
        }else{
            new CreateProjectUseCase(this.projectRepository).execute(createProjectDto!).then(project => {
                res.status(201).json({
                    succes: true,
                    message: "Proyecto creado correctamente",
                    data: project
                });
            }).catch((error) => {
                res.status(500).json({
                    succes: false,
                    message: "Error al crear proyecto",
                    data: error
                });
            });
        }
    }

    public getAllProjects = (req: Request, res: Response) => {
        let tags: string[] = [];

        if (req.query.tags) {
            if (Array.isArray(req.query.tags)) {
                tags = req.query.tags.map(tag => String(tag));
            } else if (typeof req.query.tags === 'string') {
                tags = req.query.tags.split(",").map(tag => tag.trim());
            } else if (typeof req.query.tags === 'object') {
                tags = Object.values(req.query.tags).map(tag => String(tag));
            }
        }

        const filters: Filters = {
            portfolioType: req.query.portfolioType as "quantum-md" | "personal",
            tags,
            page: req.query.page ? +req.query.page : 1,
            search: req.query.search as string,
            limit: req.query.limit ? +req.query.limit : 10
        };
    
        new FindAllProjectUseCase(this.projectRepository).execute(filters)
            .then(({ projects, totalItems }) => {
                res.status(200).json({
                    success: true,
                    message: "Proyectos obtenidos correctamente",
                    data: projects,
                    pagination: {
                        page: filters.page,
                        limit: filters.limit,
                        totalItems: totalItems,
                        totalPages: Math.ceil(totalItems / filters.limit!)
                    }
                });
            })
            .catch((error) => {
                console.error("Error al obtener proyectos:", error);
                res.status(500).json({
                    success: false,
                    message: "Error interno al obtener proyectos",
                    error: error.message || error
                });
            });
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
                    succes: true,
                    message: "Proyecto actualizado correctamente",
                    data: project
                });
            }).catch((error) => {
                res.status(400).json({
                    succes: false,
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
                succes: true,
                message: "Proyecto eliminado correctamente",
                data: project
            });
        }).catch((error) => {
            res.status(400).json({
                succes: false,
                message: "Error al eliminar proyecto",
                data: error
            });
        });
    }
}
import { CreateProjectDto } from "../dtos/project/createProject.dto";
import { QueryParamsDto } from "../dtos/project/queryParams.dto";
import { UpdateProjectDto } from "../dtos/project/updateProject.dto";
import { ProjectEntity } from "../entities/project.entity";

export abstract class ProjectRepository {
    abstract createProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity>;
    abstract findProjectBySlugAndType(slug: string, portfolioType: "quantum-md" | "personal"): Promise<ProjectEntity>;
    abstract findAllProjects(queryParamsDto?: QueryParamsDto): Promise<{projects: ProjectEntity[], pagination: object}>;
    abstract updateProject(updateProjectDto: UpdateProjectDto): Promise<ProjectEntity>;
    abstract deleteProject(id: string): Promise<ProjectEntity>;
}
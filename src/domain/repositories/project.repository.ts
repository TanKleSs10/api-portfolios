import { CreateProjectDto } from "../dtos/project/createProject.dto";
import { UpdateProjectDto } from "../dtos/project/updateProject.dto";
import { ProjectEntity } from "../entities/project.entity";
import { Filters } from "../usecases/project/findAllProjects.usecase";

export abstract class ProjectRepository {
    abstract createProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity>;
    abstract findProjectBySlugAndType(slug: string, portfolioType: "quantum-md" | "personal"): Promise<ProjectEntity>;
    abstract findAllProjects(filters?: Filters): Promise<{projects: ProjectEntity[], totalItems: number}>;
    abstract updateProject(updateProjectDto: UpdateProjectDto): Promise<ProjectEntity>;
    abstract deleteProject(id: string): Promise<ProjectEntity>;
}
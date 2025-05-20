import { CreateProjectDto } from "../dtos/project/createProject.dto";
import { UpdateProjectDto } from "../dtos/project/updateProject.dto";
import { ImageEntity } from "../entities/image.entity";
import { ProjectEntity } from "../entities/project.entity";

export abstract class ProjectDataSource {
    abstract createProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity>;
    abstract findProjectById(id: string): Promise<ProjectEntity>;
    abstract findProjectBySlugAndType(slug: string, portfolioType: "quantum-md" | "personal"): Promise<ProjectEntity>;
    abstract findAllProjects(query: any, page: number, limit: number): Promise<ProjectEntity[]>;
    abstract countProjects(query: any): Promise<number>
    abstract updateProject(updateProjectDto: UpdateProjectDto): Promise<ProjectEntity>;
    abstract deleteProject(id: string): Promise<ProjectEntity>;
    abstract getImagesFromProject(entityId: string): Promise<ImageEntity[]>;
    abstract deleteImageFromProject(entityId: string): Promise<boolean>;
}
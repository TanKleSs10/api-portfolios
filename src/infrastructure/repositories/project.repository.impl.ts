import { ProjectDataSource } from "../../domain/datasources/project.datasource";
import { CreateProjectDto } from "../../domain/dtos/project/createProject.dto";
import { UpdateProjectDto } from "../../domain/dtos/project/updateProject.dto";
import { ProjectEntity } from "../../domain/entities/project.entity";
import { ProjectRepository } from "../../domain/repositories/project.repository";
import { Filters } from "../../domain/usecases/project/findAllProjects.usecase";

export class ProjectRepositoryImpl implements ProjectRepository {
    
    constructor( private readonly projectDataSource: ProjectDataSource) {}
    
    createProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
        return this.projectDataSource.createProject(createProjectDto);
    }

    findProjectBySlugAndType(slug: string, portfolioType: "quantum-md" | "personal"): Promise<ProjectEntity> {
        return this.projectDataSource.findProjectBySlugAndType(slug, portfolioType);
    }

    async findAllProjects(filters: Filters = {}): Promise<{projects: ProjectEntity[], totalItems: number}> {
        const { portfolioType, tags, page = 1, limit = 10, search } = filters;
        const query: any = {};

        if (portfolioType) {
            query.portfolioType = portfolioType;
        }

        if (tags && tags.length > 0) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ]
        }

        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        const [projects, totalItems] = await Promise.all([
            this.projectDataSource.findAllProjects(query, page, limit),
            this.projectDataSource.countProjects(query)
        ]);
        
        return {projects, totalItems};
    }

    updateProject(updateProjectDto: UpdateProjectDto): Promise<ProjectEntity> {
        return this.projectDataSource.updateProject(updateProjectDto);
    }

    deleteProject(id: string): Promise<ProjectEntity> {
        return this.projectDataSource.deleteProject(id);
    }
}
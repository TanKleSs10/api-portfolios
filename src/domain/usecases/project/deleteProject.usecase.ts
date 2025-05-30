import { ProjectEntity } from "../../entities/project.entity";
import { ProjectRepository } from "../../repositories/project.repository";

export interface IDeleteProjectUseCase {
    execute(id: string): Promise<ProjectEntity>;
} 

export class DeleteProjectUseCase implements IDeleteProjectUseCase {
    constructor(
        private readonly projectRepository: ProjectRepository,
    ){}

    execute(id: string): Promise<ProjectEntity> {
        return this.projectRepository.deleteProject(id);
    }
} 
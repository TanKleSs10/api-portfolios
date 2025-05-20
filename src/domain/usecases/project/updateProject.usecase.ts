import { UpdateProjectDto } from "../../dtos/project/updateProject.dto";
import { ProjectEntity } from "../../entities/project.entity";
import { ProjectRepository } from "../../repositories/project.repository";

export interface IUpdateProjectUseCase {
    execute(updateProject: UpdateProjectDto): Promise<ProjectEntity>;
}   

export class UpdateProjectUseCase implements IUpdateProjectUseCase { 
    constructor(
        private readonly projectRepository: ProjectRepository,
    ){}
    execute(updateProject: UpdateProjectDto): Promise<ProjectEntity> {
        return this.projectRepository.updateProject(updateProject);
    }
}
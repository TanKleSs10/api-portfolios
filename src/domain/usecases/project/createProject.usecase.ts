import { CreateProjectDto } from "../../dtos/project/createProject.dto";
import { ProjectEntity } from "../../entities/project.entity";
import { ProjectRepository } from "../../repositories/project.repository";

export interface ICreateProjectUseCase {
    execute(createProjectDto: CreateProjectDto): Promise<ProjectEntity>;
} 

export class CreateProjectUseCase implements ICreateProjectUseCase {
    constructor(
        private readonly projectRepository: ProjectRepository,
    ){}

    execute(createProjectDto: CreateProjectDto): Promise<ProjectEntity> { 
        return this.projectRepository.createProject(createProjectDto);
    }
}
import { QueryParamsDto } from "../../dtos/project/queryParams.dto";
import { ProjectEntity } from "../../entities/project.entity";
import { ProjectRepository } from "../../repositories/project.repository";


export interface IFindAllProjectsUseCase {
    execute(queryParamsDto?: QueryParamsDto ): Promise<{projects: ProjectEntity[], pagination: object}>;
}


export class FindAllProjectsUseCase implements IFindAllProjectsUseCase {
    constructor(
        private readonly projectRepository: ProjectRepository,
    ) {}

    execute(queryParamsDto?: QueryParamsDto): Promise<{projects: ProjectEntity[], pagination: object}> {
        return this.projectRepository.findAllProjects(queryParamsDto);
    }
}

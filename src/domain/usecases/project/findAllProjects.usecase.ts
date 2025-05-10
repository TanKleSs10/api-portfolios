import { ProjectEntity } from "../../entities/project.entity";
import { ProjectRepository } from "../../repositories/project.repository";

export interface Filters {
    portfolioType?: "quantum-md" | "personal";
    tags?: string[];
    search?: string;
    page?: number;
    limit?: number;
}

export interface IFindAllProjectUseCase {
    execute(filters?: Filters): Promise<{projects: ProjectEntity[], totalItems: number}>;
}

export class FindAllProjectUseCase implements IFindAllProjectUseCase {
    constructor(
        private readonly projectRepository: ProjectRepository,
    ) {}

    execute(filters?: Filters): Promise<{projects: ProjectEntity[], totalItems: number}> {
        return this.projectRepository.findAllProjects(filters || {});
    }
}

import { ProjectEntity } from "../../entities/project.entity";
import { ProjectRepository } from "../../repositories/project.repository";

export interface IFindProjectBySlugAndTypeUseCase {
    execute(slug: string, portfolioType: "quantum-md" | "personal"): Promise<ProjectEntity>;
}

export class FindProjectBySlugAndTypeUseCase implements IFindProjectBySlugAndTypeUseCase {
    constructor(
        private readonly projectRepository: ProjectRepository,
    ){}
    execute(slug: string, portfolioType: "quantum-md" | "personal"): Promise<ProjectEntity> {
        return this.projectRepository.findProjectBySlugAndType(slug, portfolioType);
    }
}
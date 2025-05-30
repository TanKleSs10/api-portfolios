import { ProjectDataSource } from "../../domain/datasources/project.datasource";
import { CreateProjectDto } from "../../domain/dtos/project/createProject.dto";
import { UpdateProjectDto } from "../../domain/dtos/project/updateProject.dto";
import { ImageEntity } from "../../domain/entities/image.entity";
import { ProjectEntity } from "../../domain/entities/project.entity";
import { imageModel } from "../models/ImageModel";
import { projectModel } from "../models/ProjectModel";

export class ProjectDataSourceImpl implements ProjectDataSource {
    async createProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
        const newProject = await projectModel.create(createProjectDto);
        return ProjectEntity.fromObject(newProject);
    }

    async findProjectById(id: string): Promise<ProjectEntity> {
        const project = await projectModel.findById(id).populate("tags", "name").populate("images");
        if (!project) {
            throw new Error("Project not found.");
        }
        return ProjectEntity.fromObject(project);
    }

    async findProjectBySlugAndType(slug: string, portfolioType: "quantum-md" | "personal"): Promise<ProjectEntity> {
        const project = await projectModel.findOne({ slug, portfolioType }).populate("tags", "name");
        if (!project) {
            throw new Error("Project not found.");
        }
        return ProjectEntity.fromObject(project);
    }

    async findAllProjects(query: any, page: number, limit: number): Promise<ProjectEntity[]> {
        const projects = await projectModel
        .find(query)
        .populate("tags", "name")
        .populate("images", "name url alt isMain")
        .skip((page - 1) * limit)
        .limit(limit);

        return projects.map(project => ProjectEntity.fromObject(project));
    }

    async countProjects(query: any): Promise<number> {
        const count = await projectModel.countDocuments(query);
        return count;
    }

    async updateProject(updateProjectDto: UpdateProjectDto): Promise<ProjectEntity> {
        const project = await projectModel.findByIdAndUpdate(updateProjectDto.id, {
            $set: updateProjectDto.values,
            new: true, runValidators: true
        });
        if (!project) {
            throw new Error("Project not found.");
        }
        return ProjectEntity.fromObject(project);
    }

    async deleteProject(id: string): Promise<ProjectEntity> {
        const project = await projectModel.findByIdAndDelete(id);
        if (!project) {
            throw new Error("Project not found.");
        }
        return ProjectEntity.fromObject(project);
    }

    async getImagesFromProject(entityId: string): Promise<ImageEntity[]> {
        const images = await imageModel.find({entityId, entityType: "projectModel"});
        return images.map(image => ImageEntity.fromObject(image));
    }

    async deleteImageFromProject(entityId: string): Promise<boolean> {
        const images = await imageModel.deleteMany({entityId, entityType: "projectModel"});
        return images.acknowledged
    }
}
import { Request, Response } from "express";
import { TagRepository } from "../../domain/repositories/tag.repository";
import { FindAllTagUseCase } from "../../domain/usecases/tag/findAllTags.usecase";
import { FindTagByIdUseCase } from "../../domain/usecases/tag/findTagById.usecase";
import { FindTagByNameUseCase } from "../../domain/usecases/tag/findTagByName";
import { CreateTagDto } from "../../domain/dtos/tag/createTag.dto";
import { CreateTagUseCase } from "../../domain/usecases/tag/createTag.usecase";
import { UpdateTagDto } from "../../domain/dtos/tag/updateTag.dto";
import { UpdateTagUseCase } from "../../domain/usecases/tag/updateTag.usecase";
import { DeleteTagUseCase } from "../../domain/usecases/tag/deleteTag.usecase";
import { WinstonLogger } from "../../config/winstonConfig";

export class TagController {
    constructor(
        private readonly tagRepository: TagRepository,
        private readonly logger: WinstonLogger
    ) {}
    
    public createTag = (req:Request, res: Response) => {
        const [error, createTagDto] = CreateTagDto.create(req.body);
        if(error){
            this.logger.error("Error creating tag", { error: error }, "tagController");
            res.status(400).json({
                success: false,
                message: "Error al crear tag",  
                data: error
            })
        }else{
            new CreateTagUseCase(this.tagRepository).execute(createTagDto!).then(tag => {
                res.status(201).json({
                    success: true,
                    message: "Tag creado correctamente",
                    data: tag
                });
            }).catch(error => {
                this.logger.error("Error creating tag", error, "tagController");
                res.status(400).json({
                    success: false,
                    message: "Error al crear tag",  
                    data: error
                })
            });
        }
    }
    
    public getTags = (_req:Request, res: Response) => {
    new FindAllTagUseCase(this.tagRepository).execute().then(tags => {
        res.status(200).json({
            success: true,
            message: "Tags obtenidos correctamente",
            data: tags
        });
        }).catch(error => {
        console.log(error);
        this.logger.error("Error fetching tags", { error: error as string }, "tagController");
        res.status(400).json({
            success: false,
            message: "Error al obtener tags",
            data: error
        });
        });
    }

    public getTagById = (req:Request, res: Response) => {
        const { id } = req.params;
        new FindTagByIdUseCase(this.tagRepository).execute(id).then(tag => {
            res.status(200).json({
                success: true,
                message: "Tag obtenido correctamente",
                data: tag
            });
        }).catch(error => {
            this.logger.error("Error fetching tag", { error: error }, "tagController");
            res.status(400).json({
                success: false,
                message: "Error al obtener tag",
                data: error
            });
        });
    }

    public getTagByName = (req:Request, res: Response) => {
        const { name } = req.params;
        new FindTagByNameUseCase(this.tagRepository).execute(name).then(tag => {
            res.status(200).json({
                success: true,
                message: "Tag obtenido correctamente",
                data: tag
            });
        }).catch(error => {
            this.logger.error("Error fetching tag", { error: error }, "tagController");
            res.status(400).json({
                success: false,
                message: "Error al obtener tag",
                data: error
            });
        });
    }


     public updateTag = (req:Request, res: Response) => {
        const { id } = req.params;
        const [error, updateTagDto] = UpdateTagDto.create({...req.body, id});
        if(error) {
            this.logger.error("Error updating tag", { error: error }, "tagController");
            res.status(400).json({
                success: false,
                message: "Error al actualizar tag",
                data: error
            })
        }else{
            new UpdateTagUseCase(this.tagRepository).execute(updateTagDto!).then(tag => {
                res.status(200).json({
                    success: true,
                    message: "Tag actualizado correctamente",
                    data: tag
                });
            }).catch(error => {
                this.logger.error("Error updating tag", { error: error }, "tagController");
                res.status(400).json({
                    success: false,
                    message: "Error al actualizar tag",
                    data: error
                })
            });
        }
    }

    public deleteTag = (req:Request, res: Response) => {
        const { id } = req.params;
        new DeleteTagUseCase(this.tagRepository).execute(id).then(tag => {
            res.status(200).json({
            success: true,
            message: "Tag eliminado correctamente",
            data: tag
        });
        }).catch(error => {
            this.logger.error("Error deleting tag", { error: error }, "tagController");
            res.status(400).json({
                success: false,
                message: "Error al eliminar tag",
                data: error
            });
        });
    }
}

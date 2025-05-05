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

export class TagController {
    constructor(private readonly tagRepository: TagRepository) {}

    public getTags = (_req:Request, res: Response) => {
    new FindAllTagUseCase(this.tagRepository).execute().then(tags => {
        res.status(200).json(tags);
        }).catch(err => {
        res.status(400).json(err);
        });
    }

    public getTagById = (req:Request, res: Response) => {
        const { id } = req.params;
        new FindTagByIdUseCase(this.tagRepository).execute(id).then(tag => { 
            res.status(200).json(tag);
        }).catch(err => {
            res.status(400).json(err);
        });
    }

    public getTagByName = (req:Request, res: Response) => {
        const { name } = req.params;
        new FindTagByNameUseCase(this.tagRepository).execute(name).then(tag => { 
            res.status(200).json(tag);
        }).catch(err => {
            res.status(400).json(err);
        });
    }

    public createTag = (req:Request, res: Response) => {
        const [error, createTagDto] = CreateTagDto.create(req.body);
        if(error){
            res.status(400).json(error)
        }else{
            new CreateTagUseCase(this.tagRepository).execute(createTagDto!).then(tag => {
                res.status(201).json(tag);
            }).catch(error => {
                res.status(400).json(error);
            });
        }
    }

     public updateTag = (req:Request, res: Response) => {
        const { id } = req.params;
        const [error, updateTagDto] = UpdateTagDto.create({...req.body, id});
        if(error) {
            res.status(400).json(error)
        }else{
            new UpdateTagUseCase(this.tagRepository).execute(updateTagDto!).then(tag => {
                res.status(200).json(tag);
            }).catch(error => {
                res.status(400).json(error);
            });
        }
    }

    public deleteTag = (req:Request, res: Response) => {
        const { id } = req.params;
        new DeleteTagUseCase(this.tagRepository).execute(id).then(tag => {
        res.status(200).json(tag);
        }).catch(error => {
            res.status(400).json(error);
        });
    }
}

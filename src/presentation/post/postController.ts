import { Request, Response } from "express";
import { PostRepository } from "../../domain/repositories/post.repository";
import { CreatePostDto } from "../../domain/dtos/post/createPost.dto";
import { CreatePostUseCase } from "../../domain/usecases/post/createPost.usecase";
import { FindAllPostsUseCase } from "../../domain/usecases/post/findAllPost.usecase";
import { FindPostByIdUseCase } from "../../domain/usecases/post/findPostById.usecase";
import { UpdatePostDto } from "../../domain/dtos/post/updatePost.dto";
import { UpdatePostUseCase } from "../../domain/usecases/post/updatePost.usecase";
import { DeletePostUseCase } from "../../domain/usecases/post/delete.Post.usecase";

export class PostController {
    constructor(
        private readonly postRepository: PostRepository
    ){}

    public createPost = (req:Request, res: Response) => {
        req.body.slug = req.body.title.toLowerCase().replace(/\s/g, "-");
        const [error, createPostDto] = CreatePostDto.create(req.body);
        if(error){
            res.status(400).json({
                success: false,
                message: "Error al crear post",  
                data: error
            })
        } else {
            new CreatePostUseCase(this.postRepository).execute(createPostDto!).then(post => {
                res.status(201).json({
                    success: true,
                    message: "Post creado correctamente",
                    data: post
                });
            }).catch(error => {
                res.status(400).json({
                    success: false,
                    message: "Error al crear post",  
                    data: error
                })
            });
        }
    }

    public getAllPost = (req:Request, res: Response) => {
        new FindAllPostsUseCase(this.postRepository).execute().then(post => {
            res.status(200).json({
                success: true,
                message: "Posts obtenidos correctamente",
                data: post
            });
        }).catch(error => {
            res.status(400).json({
                success: false,
                message: "Error al obtener posts",
                data: error
            });
        });
    }

    public getPostById = (req:Request, res: Response) => {
        const { id } = req.params;
        new FindPostByIdUseCase(this.postRepository).execute(id).then(post => {
            res.status(200).json({
                success: true,
                message: "Post obtenido correctamente",
                data: post
            });
        }).catch(error => {
            res.status(400).json({
                success: false,
                message: "Error al obtener post",
                data: error
            });
        });
    }

    public updatePost = (req: Request, res: Response) => {
        const { id } = req.params;
        req.body.slug = req.body.title.toLowerCase().replace(/\s/g, "-");
        const [error, updatePostDto] = UpdatePostDto.create({ id, ...req.body });
        console.log(updatePostDto?.id);
        if (error) {
            res.status(400).json({
                success: false,
                message: "Error al actualizar post",
                data: error
            });
        } else {
            new UpdatePostUseCase(this.postRepository).execute(updatePostDto!).then(post => {
                res.status(200).json({
                    success: true,
                    message: "Post actualizado correctamente",
                    data: post
                });
            }).catch(error => {
                console.log(error);
                res.status(400).json({
                    success: false,
                    message: "Error al actualizar post",
                    data: error
                });
            });
        }
    };

    public deletePost = (req: Request, res: Response) => {
        const { id } = req.params;
        new DeletePostUseCase(this.postRepository).execute(id).then(post => {
            res.status(200).json({
                success: true,
                message: "Post eliminado correctamente",
                data: post
            });
        }).catch(error => {
            console.log(error)
            res.status(400).json({
                success: false,
                message: "Error al eliminar post",
                data: error
            });
        });
    }
}
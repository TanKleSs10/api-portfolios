import { CreatePostDto } from "../dtos/post/createPost.dto";
import { UpdatePostDto } from "../dtos/post/updatePost.dto";
import { PostEntity } from "../entities/post.entity";

export abstract class PostDataSource {
    abstract createPost(createPostDto: CreatePostDto): Promise<PostEntity>;
    abstract getPosts(): Promise<PostEntity[]>;
    abstract getPost(id: string): Promise<PostEntity>;
    abstract updatePost(updatePostDto: UpdatePostDto): Promise<PostEntity>; 
    abstract deletePost(id: string): Promise<PostEntity>;
    // TODO: Pendiente de implementar
    abstract deleteImageFromPost(entityId: string): Promise<void>;
}
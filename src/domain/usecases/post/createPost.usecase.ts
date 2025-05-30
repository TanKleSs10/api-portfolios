import { CreatePostDto } from "../../dtos/post/createPost.dto";
import { PostEntity } from "../../entities/post.entity";
import { PostRepository } from "../../repositories/post.repository";

export interface ICreatePostUseCase {
    execute(createPostDto: CreatePostDto): Promise<PostEntity>; 
}

export class CreatePostUseCase implements ICreatePostUseCase {
    constructor(
        private readonly postRepository: PostRepository
    ){}
    
    execute(createPostDto: CreatePostDto): Promise<PostEntity> {
        return this.postRepository.createPost(createPostDto);
    }
}
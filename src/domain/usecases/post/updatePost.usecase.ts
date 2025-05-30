import { UpdatePostDto } from "../../dtos/post/updatePost.dto";
import { PostEntity } from "../../entities/post.entity";
import { PostRepository } from "../../repositories/post.repository";

export interface IUpdatePostUseCase {
    execute(updatePostDto: UpdatePostDto): Promise<PostEntity>;  
}

export class UpdatePostUseCase implements IUpdatePostUseCase {
    constructor(
        private readonly postRepository: PostRepository
    ){}
    execute(updatePostDto: UpdatePostDto): Promise<PostEntity> {
        return this.postRepository.updatePost(updatePostDto);
    }
}
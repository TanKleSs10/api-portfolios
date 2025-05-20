import { PostEntity } from "../../entities/post.entity";
import { PostRepository } from "../../repositories/post.repository";

export interface IDeletePostUseCase {
    execute(id: string): Promise<PostEntity>; 
}

export class DeletePostUseCase implements IDeletePostUseCase {
    constructor(
        private readonly postRepository: PostRepository
    ){}

    execute(id: string): Promise<PostEntity> {
        return this.postRepository.deletePost(id);
    }
}
import { PostEntity } from "../../entities/post.entity";
import { PostRepository } from "../../repositories/post.repository";

export interface IFindPostByIdUseCase {
    execute(id: string): Promise<PostEntity>; 
}

export class FindPostByIdUseCase implements IFindPostByIdUseCase {
    constructor(
        private readonly postRepository: PostRepository
    ){}

    execute(id: string): Promise<PostEntity> {
        return this.postRepository.getPost(id);
    }
}
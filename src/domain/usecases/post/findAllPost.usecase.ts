import { PostEntity } from "../../entities/post.entity";
import { PostRepository } from "../../repositories/post.repository";

export interface IFindAllPostsUseCase {
    execute(): Promise<PostEntity[]>; 
}

export class FindAllPostsUseCase implements IFindAllPostsUseCase {
    constructor(
        private readonly postRepository: PostRepository
    ){}

    execute(): Promise<PostEntity[]> {
        return this.postRepository.getPosts();
    }
}
import { PostEntity } from "../../entities/post.entity";
import { PostRepository } from "../../repositories/post.repository";

export interface IDeletePostUseCase {
    execute(id: string, userId: string, userRole: "editor" | "admin"): Promise<PostEntity>; 
}

export class DeletePostUseCase implements IDeletePostUseCase {
    constructor(
        private readonly postRepository: PostRepository
    ){}

    execute(id: string, userId: string, userRole: "editor" | "admin"): Promise<PostEntity> {
        return this.postRepository.deletePost(id, userId, userRole);
    }
}
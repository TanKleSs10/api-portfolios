import { PostDataSource } from "../../domain/datasources/post.datasource";
import { CreatePostDto } from "../../domain/dtos/post/createPost.dto";
import { UpdatePostDto } from "../../domain/dtos/post/updatePost.dto";
import { PostEntity } from "../../domain/entities/post.entity";
import { PostRepository } from "../../domain/repositories/post.repository";

export class PostRepositoryImpl implements PostRepository {
    constructor( private readonly postDataSource: PostDataSource ) {}
    
    createPost(createPostDto: CreatePostDto): Promise<PostEntity> {
        return this.postDataSource.createPost(createPostDto);
    }

    getPosts(): Promise<PostEntity[]> {
        return this.postDataSource.getPosts();
    }

    getPost(id: string): Promise<PostEntity> {
        return this.postDataSource.getPost(id);
    }

    updatePost(updatePostDto: UpdatePostDto): Promise<PostEntity> {
        return this.postDataSource.updatePost(updatePostDto);
    }

    deletePost(id: string): Promise<PostEntity> {
        return this.postDataSource.deletePost(id);
    }
}
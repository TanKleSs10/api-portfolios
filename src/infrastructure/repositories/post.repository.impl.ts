import { PostDataSource } from "../../domain/datasources/post.datasource";
import { CreatePostDto } from "../../domain/dtos/post/createPost.dto";
import { UpdatePostDto } from "../../domain/dtos/post/updatePost.dto";
import { PostEntity } from "../../domain/entities/post.entity";
import { PostRepository } from "../../domain/repositories/post.repository";
import { CloudinaryAdapter } from "../adapters/cloudinary.adapter";

export class PostRepositoryImpl implements PostRepository {
    private uploads = CloudinaryAdapter;

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

    async updatePost(updatePostDto: UpdatePostDto): Promise<PostEntity> {
        const post = await this.postDataSource.getPost(updatePostDto.id);
        if (!post) throw new Error("Post not found.");
        console.log(updatePostDto.user_role, updatePostDto.userId);
        if (updatePostDto.userId !== post.id && updatePostDto.user_role !== "admin") throw new Error("User not authorized to update this post.");
        const postUpdated = await this.postDataSource.updatePost(updatePostDto);
        if (!postUpdated) throw new Error("Error updating post.");
        return postUpdated;
    }

    async deletePost(id: string): Promise<PostEntity> {
        const images = await this.postDataSource.getImagesFromPost(id);
        images.forEach(image => this.uploads.deleteImage(image.publicId!));
        const  isDeleted = await this.postDataSource.deleteImageFromPost(id);
        if(!isDeleted){
            throw new Error("Error to delete images");
        }
        return this.postDataSource.deletePost(id);
    }
}
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

    updatePost(updatePostDto: UpdatePostDto): Promise<PostEntity> {
        return this.postDataSource.updatePost(updatePostDto);
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
import { PostDataSource } from "../../domain/datasources/post.datasource";
import { CreatePostDto } from "../../domain/dtos/post/createPost.dto";
import { UpdatePostDto } from "../../domain/dtos/post/updatePost.dto";
import { ImageEntity } from "../../domain/entities/image.entity";
import { PostEntity } from "../../domain/entities/post.entity";
import { imageModel } from "../models/ImageModel";
import { postModel } from "../models/PostModel";

export class PostDataSourceImpl implements PostDataSource {
    
    async createPost(createPostDto: CreatePostDto): Promise<PostEntity> {
        const newPost = await postModel.create(createPostDto);
        return PostEntity.fromObject(newPost);
    }
    
    async getPosts(): Promise<PostEntity[]> {
        const posts = await postModel.find().populate("tags", "name").populate("images", "name alt url isMain").populate("user", "name email");
        return posts.map(post => PostEntity.fromObject(post));
    }
    
    async getPost(id: string): Promise<PostEntity> {
        const post = await postModel.findById(id).populate("tags", "name").populate("images", "name alt url isMain").populate("user", "name email");
        if (!post) {
            throw new Error("Post not found.");
        }
        return PostEntity.fromObject(post);
    }
    
    async updatePost(updatePostDto: UpdatePostDto): Promise<PostEntity> {
        const post = await postModel.findByIdAndUpdate(updatePostDto.id, 
            {$set: updatePostDto.values},
            {new: true, runValidators: true}
        );
        if (!post) {
            throw new Error("Post not found.");
        }
        return PostEntity.fromObject(post);
    }
    
    async deletePost(id: string): Promise<PostEntity> {
        const post = await postModel.findByIdAndDelete(id);
        if (!post) {
            throw new Error("Post not found.");
        }
        return PostEntity.fromObject(post);
    }

    async getImagesFromPost(entityId: string): Promise<ImageEntity[]> {
        const images = await imageModel.find({entityId, entityType: "postModel"});
        return images.map(image => ImageEntity.fromObject(image));
    }

    async deleteImageFromPost(entityId: string): Promise<boolean> {
        const images = await imageModel.deleteMany({entityId, entityType: "postModel"});
        return images.acknowledged
    }
}
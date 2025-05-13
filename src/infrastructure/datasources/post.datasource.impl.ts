import { PostDataSource } from "../../domain/datasources/post.datasource";
import { CreatePostDto } from "../../domain/dtos/post/createPost.dto";
import { UpdatePostDto } from "../../domain/dtos/post/updatePost.dto";
import { PostEntity } from "../../domain/entities/post.entity";
import { imageModel } from "../models/ImageModel";
import { postModel } from "../models/PostModel";

export class PostDataSourceImpl implements PostDataSource {
    
    async createPost(createPostDto: CreatePostDto): Promise<PostEntity> {
        const newPost = await postModel.create(createPostDto);
        return PostEntity.fromObject(newPost);
    }
    
    async getPosts(): Promise<PostEntity[]> {
        const posts = await postModel.find().populate("tags", "name").populate("images", "name alt url isMain");
        return posts.map(post => PostEntity.fromObject(post));
    }
    
    async getPost(id: string): Promise<PostEntity> {
        const post = await postModel.findById(id).populate("tags", "name").populate("images", "name alt url isMain publicId");
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

    async deleteImageFromPost(entityId: string): Promise<void> {
        const images = await imageModel.deleteMany({entityId, entityType: "postModel"});
        return;
    }

}
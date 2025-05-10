import { ImageDataSource } from "../../domain/datasources/image.datasource";
import { CreateImageDto } from "../../domain/dtos/image/createImage.dto";
import { UpdateImageDto } from "../../domain/dtos/image/updateImage.dto";
import { ImageEntity } from "../../domain/entities/image.entity";
import { ImageRepository } from "../../domain/repositories/image.repository";
import { CloudinaryAdapter } from "../adapters/cloudinary.adapter";

export class ImageRepositoryImpl implements ImageRepository {
    private deleteImageAdapter = CloudinaryAdapter.deleteImage;

    constructor( private readonly imageDataSource: ImageDataSource) {}
    
    createImage(createImageDto: CreateImageDto): Promise<ImageEntity> {
        return this.imageDataSource.createImage(createImageDto);
    }

    setMainImage(id: string, projectId: string): Promise<ImageEntity> {
        return this.imageDataSource.setMainImage(id, projectId);
    }
    
    updateImage(updateImageDto: UpdateImageDto): Promise<ImageEntity> {
        return this.imageDataSource.updateImage(updateImageDto);
    }

    async deleteImage(id: string): Promise<ImageEntity> {
        const image = await this.imageDataSource.findImageById(id);
        if (!image) {
            throw new Error("Image not found.");
        }
        
        const deleteImage = await this.deleteImageAdapter(image.publicId);
        if (!deleteImage) {
            throw new Error("Image not found.");
        }
        return this.imageDataSource.deleteImage(id);
    }
}
import { error } from "console";
import { ImageDataSource } from "../../domain/datasources/image.datasource";
import { CreateImageDto } from "../../domain/dtos/image/createImage.dto";
import { UpdateImageDto } from "../../domain/dtos/image/updateImage.dto";
import { ImageEntity } from "../../domain/entities/image.entity";
import { ImageRepository } from "../../domain/repositories/image.repository";
import { CloudinaryAdapter } from "../adapters/cloudinary.adapter";

export class ImageRepositoryImpl implements ImageRepository {
    private deleteImageAdapter = CloudinaryAdapter.deleteImage;

    constructor( private readonly imageDataSource: ImageDataSource) {}
    
    async createImage(createImageDto: CreateImageDto): Promise<ImageEntity> {
        const { entityId, entityType } = createImageDto;
      
        if (!entityType || !entityId) {
          throw new Error("Entity type and ID are required.");
        }
      
        const exists = await this.imageDataSource.validateEntity(entityId, entityType);
      
        if (!exists) {
          throw new Error(`Entity of type '${entityType}' with ID '${entityId}' not found.`);
        }
      
        const newImage = await this.imageDataSource.createImage(createImageDto);
        await this.imageDataSource.addImagetoEntity(newImage.entityId, newImage.id, newImage.entityType);
      
        return newImage;
      }
    
    async setMainImage(id: string, entityId: string): Promise<ImageEntity> {
        await this.imageDataSource.setNotMainImage(entityId);
        return this.imageDataSource.setMainImage(id);
    }
    
    updateImage(updateImageDto: UpdateImageDto): Promise<ImageEntity> {
        return this.imageDataSource.updateImage(updateImageDto);
    }
    
    async deleteImage(id: string): Promise<ImageEntity> {
        const image = await this.imageDataSource.findImageById(id);
        if (!image) {
            throw new Error("Image not found.");
        }
        // Elimina la imagen de la nube
        const deleteImage = await this.deleteImageAdapter(image.publicId);
        if (!deleteImage) {
            throw new Error("Image not found.");
        }
        await this.imageDataSource.revomeImagefromEntity(image.entityId, image.id, image.entityType);
        return this.imageDataSource.deleteImage(id);
    }
    
}
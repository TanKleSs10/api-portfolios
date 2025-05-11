import { CreateImageDto } from "../dtos/image/createImage.dto";
import { UpdateImageDto } from "../dtos/image/updateImage.dto";
import { ImageEntity } from "../entities/image.entity";

export abstract class ImageDataSource {
    abstract createImage(createImageDto: CreateImageDto): Promise<ImageEntity>;
    abstract findImageById(id: string): Promise<ImageEntity>;
    abstract validateEntity(entityId: string, entityType: string): Promise<boolean>;
    abstract addImagetoEntity(entityId: string, imageId: string, entityType: string) : Promise<void>
    abstract setNotMainImage(projectId: string): Promise<void>;
    abstract setMainImage(id: string): Promise<ImageEntity>;
    abstract revomeImagefromEntity(entityId: string, imageId: string, entityType: string) : Promise<void>
    abstract updateImage(updateImageDto: UpdateImageDto): Promise<ImageEntity>;
    abstract deleteImage(id: string): Promise<ImageEntity>;
}
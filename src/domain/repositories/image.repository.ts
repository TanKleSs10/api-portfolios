import { CreateImageDto } from "../dtos/image/createImage.dto";
import { UpdateImageDto } from "../dtos/image/updateImage.dto";
import { ImageEntity } from "../entities/image.entity";

export abstract class ImageRepository {
    abstract createImage(createImageDto: CreateImageDto): Promise<ImageEntity>;
    abstract setMainImage(id: string, entityId: string): Promise<ImageEntity>;
    abstract updateImage(updateImageDto: UpdateImageDto): Promise<ImageEntity>;
    abstract deleteImage(id: string): Promise<ImageEntity>;
}
import { UpdateImageDto } from "../../dtos/image/updateImage.dto";
import { ImageEntity } from "../../entities/image.entity";
import { ImageRepository } from "../../repositories/image.repository";

export interface IUpdateImageUseCase {
    execute(updateImageDto: UpdateImageDto): Promise<ImageEntity>;
}   

export class UpdateImageUseCase implements IUpdateImageUseCase {
    constructor(
        private readonly ImageRepository: ImageRepository
    ){}
    execute(updateImageDto: UpdateImageDto): Promise<ImageEntity> {
        return this.ImageRepository.updateImage(updateImageDto);
    }
}
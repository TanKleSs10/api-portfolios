import { CreateImageDto } from "../../dtos/image/createImage.dto";
import { ImageEntity } from "../../entities/image.entity";
import { ImageRepository } from "../../repositories/image.repository";


export interface ICreateImageUseCase {
    execute(createImageDto: CreateImageDto): Promise<ImageEntity>;
} 

export class CreateImageUseCase implements ICreateImageUseCase {
    constructor(
        private readonly imageRepository: ImageRepository
    ){}

    execute(createImageDto: CreateImageDto): Promise<ImageEntity> { 
        return this.imageRepository.createImage(createImageDto);
    }
}
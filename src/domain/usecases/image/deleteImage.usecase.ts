import { ImageEntity } from "../../entities/image.entity";
import { ImageRepository } from "../../repositories/image.repository";

export interface IDeleteImageUseCase {
    execute(id: string): Promise<ImageEntity>;
} 

export class DeleteImageUseCase implements IDeleteImageUseCase {
    constructor(
        private readonly imageRepository: ImageRepository
    ){}

    execute(id: string): Promise<ImageEntity> {
        return this.imageRepository.deleteImage(id);
    }
} 
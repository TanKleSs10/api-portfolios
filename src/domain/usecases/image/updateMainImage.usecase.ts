import { ImageEntity } from "../../entities/image.entity";
import { ImageRepository } from "../../repositories/image.repository";

export interface IUpdateMainImageUseCase {
    execute(id: string, projectId: string): Promise<ImageEntity>;
} 

export class UpdateMainImageUseCase implements IUpdateMainImageUseCase {
    constructor(
        private readonly imageRepository: ImageRepository
    ){}

    execute(id: string, projectId: string): Promise<ImageEntity> {
        return this.imageRepository.setMainImage(id, projectId);
    }
} 
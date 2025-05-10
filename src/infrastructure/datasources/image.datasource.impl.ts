import { ImageDataSource } from "../../domain/datasources/image.datasource";
import { CreateImageDto } from "../../domain/dtos/image/createImage.dto";
import { UpdateImageDto } from "../../domain/dtos/image/updateImage.dto";
import { ImageEntity } from "../../domain/entities/image.entity";
import { imageModel } from "../models/ImageModel";
import { projectModel } from "../models/ProjectModel";

export class ImageDataSourceImpl implements ImageDataSource {
    async createImage(createImageDto: CreateImageDto): Promise<ImageEntity> {
        const newImage = await imageModel.create(createImageDto);

        const project = await projectModel.findByIdAndUpdate(
            createImageDto.projectId,
            {
                $push: { images: newImage._id },  // Agregar la imagen al arreglo de imágenes
            },
            { new: true, runValidators: true } // Opcional: si necesitas que te devuelva el proyecto actualizado
        );
        // Verificar si el proyecto existe
        if (!project) {
            throw new Error("Project not found.");
        }
        return ImageEntity.fromObject(newImage);
    }
    
    async findImageById(id: string): Promise<ImageEntity> {
        const image = await imageModel.findById(id).populate("projectId");
        
        if (!image) {
            throw new Error("Image not found.");
        }
        
        return ImageEntity.fromObject(image);
    }
    
    async setMainImage(id: string, projectId: string): Promise<ImageEntity> {
        // colocar todas las imagenes como no principales
        await imageModel.updateMany({projectId}, {$set: {isMain: false}});
        // colocar la imagen como principal la imagen seleccionada
        const updateImage = await imageModel.findByIdAndUpdate(id, {$set: {isMain: true}});
        if (!updateImage) {
            throw new Error("Image not found.");
        }
        return ImageEntity.fromObject(updateImage.toObject());
    }

    async updateImage(updateImageDto: UpdateImageDto): Promise<ImageEntity> {
        const image = await imageModel.findByIdAndUpdate(
            updateImageDto.id,
            { $set: updateImageDto.values },
            { new: true, runValidators: true }
        );
        if (!image) {
            throw new Error("Image not found.");
        }
        return ImageEntity.fromObject(image.toObject());
    }
    
    async deleteImage(id: string): Promise<ImageEntity> {
        const deletedImage = await imageModel.findByIdAndDelete(id);
        if (!deletedImage) {
            throw new Error("Image not found.");
        }
        return ImageEntity.fromObject(deletedImage.toObject());
    }
}
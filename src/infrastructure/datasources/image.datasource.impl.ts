import { ImageDataSource } from "../../domain/datasources/image.datasource";
import { CreateImageDto } from "../../domain/dtos/image/createImage.dto";
import { UpdateImageDto } from "../../domain/dtos/image/updateImage.dto";
import { ImageEntity } from "../../domain/entities/image.entity";
import { imageModel } from "../models/ImageModel";
import { postModel } from "../models/PostModel";
import { projectModel } from "../models/ProjectModel";

export class ImageDataSourceImpl implements ImageDataSource {
    
    async createImage(createImageDto: CreateImageDto): Promise<ImageEntity> {
        const newImage = await imageModel.create(createImageDto);
        console.log(newImage);
        return ImageEntity.fromObject(newImage);
    }

    async findImageById(id: string): Promise<ImageEntity> {
        const image = await imageModel.findById(id);
        if (!image) {
            throw new Error("Image not found.");
        }
        return ImageEntity.fromObject(image);
    }

    async validateEntity(entityId: string, entityType: string): Promise<boolean> {
        switch (entityType) {
          case "projectModel": {
            const project = await projectModel.findById(entityId);
            return !!project; // true si existe, false si no
          }
          case "postModel": {
            const post = await postModel.findById(entityId);
            return !!post;
          }
          default:
            return false;
        }
      }
      

    async addImagetoEntity(entityId: string, imageId: string, entityType: string): Promise<void> {
        switch (entityType) {
            case "projectModel":
               const project = await projectModel.findByIdAndUpdate(
                    entityId,
                    {
                        $push: { images: imageId },  // Agregar la imagen al arreglo de imágenes
                    },
                    { new: true, runValidators: true } // Opcional: si necesitas que te devuelva el proyecto actualizado
                );
                console.log("project", project);
                break;
            case "postModel":
                await postModel.findByIdAndUpdate(
                    entityId,
                    {
                        $push: { images: imageId },  // Agregar la imagen al arreglo de imágenes
                    },
                    { new: true, runValidators: true } // Opcional: si necesitas que te devuelva el proyecto actualizado
                );
                break;
            default:
        }

    }

    async revomeImagefromEntity(entityId: string, imageId: string, entityType: string): Promise<void> {
        switch (entityType) {
            case "projectModel":
                await projectModel.findByIdAndUpdate(
                    entityId,
                    {
                        $pull: { images: imageId } // Elimina la imagen del arreglo
                    },
                    { new: true, runValidators: true }
                );
                break;
            case "postModel":
                await postModel.findByIdAndUpdate(
                    entityId,
                    {
                        $pull: { images: imageId }
                    },
                    { new: true, runValidators: true }
                );
                break;
            default:
        }
    }
    
    async setNotMainImage(entityId: string): Promise<void> {
        await imageModel.updateMany({entityId: entityId}, {$set: {isMain: false}}, {new: true}); 
    }

    async setMainImage(id: string): Promise<ImageEntity> {
        const updateImage = await imageModel.findByIdAndUpdate(id, {$set: {isMain: true}}, {new: true});
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
        return ImageEntity.fromObject(deletedImage!.toObject());
    }
    
}
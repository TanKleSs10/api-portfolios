import { Request, Response } from "express";
import { ImageRepository } from "../../domain/repositories/image.repository";
import { CreateImageDto } from "../../domain/dtos/image/createImage.dto";
import { CloudinaryAdapter } from "../../infrastructure/adapters/cloudinary.adapter";
import { DeleteImageUseCase } from "../../domain/usecases/image/deleteImage.usecase";
import { UpdateImageUseCase } from "../../domain/usecases/image/updateImage.usecase";
import { UpdateImageDto } from "../../domain/dtos/image/updateImage.dto";
import { UpdateMainImageUseCase } from "../../domain/usecases/image/updateMainImage.usecase";

export class ImageController {

    constructor(private readonly imageRepository: ImageRepository){}

    public createImage = async (req: Request, res: Response) => {
        const { projectId } = req.params;

        const files = req.files as Express.Multer.File[];
        
        try {
        
            const uploadPromises = files.map(file => 
                CloudinaryAdapter.uploadImageFromBuffer(file.buffer, file.originalname)
            );
            
            const uploadResults = await Promise.all(uploadPromises);
            
            const creationPromises = uploadResults.map((upload, i) => {
                const [error, createImageDto] = CreateImageDto.create({
                    projectId,
                    name: files[i].originalname,
                    url: upload.secure_url,
                    isMain: false,
                    publicId: upload.public_id,
                    alt: req.body.alt || '',
                });

                if(error){
                    return Promise.reject(error);
                }
                return this.imageRepository.createImage(createImageDto!);
            });


            const createdImages = await Promise.all(creationPromises);
            res.status(201).json({
                succes: true,
                message: "Imagen creada correctamente",
                data: createdImages
            });

         }catch (error) {
             res.status(400).json({
                 succes: false,
                 message: "Error al crear imagen",
                 data: error
             });
         }
    }

    public setMainImage = async (req: Request, res: Response) => {
        const { id, projectId } = req.params;
        new UpdateMainImageUseCase(this.imageRepository).execute(id, projectId).then(image => {
            res.status(200).json({
                succes: true,
                message: "Imagen principal actualizada correctamente",
                data: image
            });
        }).catch(error => {
            res.status(400).json({
                succes: false,
                message: "Error al actualizar imagen principal",
                data: error
            });
        });
    }

    public updateImage = async (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, updateImageDto] = UpdateImageDto.create({id, ...req.body});
        if(error){
            res.status(400).json({
                succes: false,
                message: "Error al actualizar imagen",
                data: error
            });
        }else{
            new UpdateImageUseCase(this.imageRepository).execute(updateImageDto!).then(image => {
                res.status(200).json({
                    succes: true,
                    message: "Imagen actualizada correctamente",
                    data: image
                });
            }).catch(error => {
                res.status(400).json({
                    succes: false,
                    message: "Error al actualizar imagen",
                    data: error
                });
            });
        }
    }

    public deleteImage = (req: Request, res: Response) => {
        const { id } = req.params;
        new DeleteImageUseCase(this.imageRepository).execute(id).then(image => {
            res.status(200).json({
                succes: true,
                message: "Imagen eliminada correctamente",
                data: image
            });
        }).catch(error => {
            res.status(400).json({
                succes: false,
                message: "Error al eliminar imagen",
                data: error
            });
        });
    }
}
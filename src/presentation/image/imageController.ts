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
        const { entityType, entityId } = req.params;
        // Validar que el tipo de entidad sea correcto
        if (!["projects", "posts"].includes(entityType)) {
            res.status(400).json({
                succes: false,
                message: "Invalid entity type.",
                data: undefined
            });
        }
        // obtener las imagenes del request
        const files = req.files as Express.Multer.File[];
        // quitarle la extensión del nombre del archivo
        try {
            // subir las imagenes a la nube
            const uploadPromises = files.map(file => 
                CloudinaryAdapter.uploadImageFromBuffer(file.buffer, file.originalname, `${entityType}/images`)
            );
            // obtener las respuestas de las subidas
            const uploadResults = await Promise.all(uploadPromises);
            // convierte las respuestas en objetos de tipo CreateImageDto
            const creationPromises = uploadResults.map((upload, i) => {
                const [error, createImageDto] = CreateImageDto.create({
                    entityId: entityId,
                    name: files[i].originalname, // nombre del archivo sin extensión
                    entityType: entityType === "projects" ? "projectModel" : "postModel",
                    isMain: false,
                    publicId: upload.public_id,
                    alt: "imagen " + files[i].originalname,
                    url: upload.secure_url,
                });

                if(error){
                    return Promise.reject(error);
                }
                // crear la imagen
                return this.imageRepository.createImage(createImageDto!);
            });
            // obtener las imagenes creadas
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
        const { id, entityId } = req.params;
        new UpdateMainImageUseCase(this.imageRepository).execute(id, entityId).then(image => {
            res.status(200).json({
                succes: true,
                message: "Imagen principal actualizada correctamente",
                data: image
            });
        }).catch(error => {
            console.log("Error en setMainImage", error);
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
            console.log("Error en deleteImage", error);
            res.status(400).json({
                succes: false,
                message: "Error al eliminar imagen",
                data: error
            });
        });
    }
}
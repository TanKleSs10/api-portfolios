import { Router } from "express";
import { ImageController } from "./imageController";
import { ImageDataSourceImpl } from "../../infrastructure/datasources/image.datasource.impl";
import { ImageRepositoryImpl } from "../../infrastructure/repositories/image.repository.impl";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export class ImageRoutes {

    static get routes(){
     const router = Router({mergeParams: true});

     const  imageDataSource = new ImageDataSourceImpl();
     const imageRepository = new ImageRepositoryImpl(imageDataSource);
     const imageController = new ImageController(imageRepository);

     router.post("/", upload.array("images", 4) ,imageController.createImage);
     router.put("/:id", imageController.updateImage);
     router.patch("/:id/main", imageController.setMainImage);
     router.delete("/:id", imageController.deleteImage);

     return router;
    }

}
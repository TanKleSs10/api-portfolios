import { Router } from "express";
import multer from "multer";
import { container } from "../../config/di.container";

// fix hidden dependency
const upload = multer({ storage: multer.memoryStorage() });

export class ImageRoutes {

    static get routes(){
     const router = Router({mergeParams: true});
     const imageController = container.imageController;

     router.post("/", upload.array("images", 4), imageController.createImage);
     router.put("/:id", imageController.updateImage);
     router.patch("/:id/main", imageController.setMainImage);
     router.delete("/:id", imageController.deleteImage);

     return router;
    }

}
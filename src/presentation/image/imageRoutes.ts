import { Router } from "express";
import multer from "multer";
import { container } from "../../config/di.container";
import { AuthMiddleware } from "../middlewares/auth.middleware";

// fix hidden dependency
const upload = multer({ storage: multer.memoryStorage() });

export class ImageRoutes {

    static get routes(){
     const router = Router({mergeParams: true});

     // Middlewares
     router.use([AuthMiddleware.validateToken, AuthMiddleware.authorizeRoles("admin", "editor")]);
     
     const imageController = container.imageController;

     router.post("/", upload.array("images", 4), imageController.createImage);
     router.put("/:id", imageController.updateImage);
     router.patch("/:id/main", imageController.setMainImage);
     router.delete("/:id", imageController.deleteImage);

     return router;
    }

}
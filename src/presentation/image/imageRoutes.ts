import { Router } from "express";
import multer from "multer";
import { container } from "../../config/di.container";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { body, param } from "express-validator";
import { ValidatorMiddleware } from "../middlewares/validator.middleware";

// fix hidden dependency
const upload = multer({ storage: multer.memoryStorage() });

export class ImageRoutes {

    static get routes(){
     const router = Router({mergeParams: true});

     // Middlewares
     router.use([AuthMiddleware.validateToken, AuthMiddleware.authorizeRoles("admin", "editor")]);
     
     const imageController = container.imageController;

     router.post("/", 
        body("name").isString().withMessage("Invalid name"),
        body("alt").isString().withMessage("Invalid alt").optional(),
        [ValidatorMiddleware.validateRequest,
        upload.array("images", 4)], 
        imageController.createImage
    );

     router.put("/:id",
        param("id").isMongoId().withMessage("Invalid image id"),
        body("name").isString().withMessage("Invalid name"),
        body("alt").isString().withMessage("Invalid alt").optional(),
        [ValidatorMiddleware.validateRequest,
        AuthMiddleware.validateToken, 
        AuthMiddleware.authorizeRoles("admin", "editor")],
        imageController.updateImage
    );
     router.patch("/:id/main", 
        param("id").isMongoId().withMessage("Invalid image id"),
        [ValidatorMiddleware.validateRequest,
        AuthMiddleware.validateToken, 
        AuthMiddleware.authorizeRoles("admin", "editor")],
        imageController.setMainImage
    );
     router.delete("/:id", 
        param("id").isMongoId().withMessage("Invalid image id"),
        [ValidatorMiddleware.validateRequest,
        AuthMiddleware.validateToken, 
        AuthMiddleware.authorizeRoles("admin", "editor")],
        imageController.deleteImage);

     return router;
    }

}
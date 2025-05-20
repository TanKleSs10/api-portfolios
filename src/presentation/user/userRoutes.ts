import { Router } from "express";
import { container } from "../../config/di.container";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { body, param } from "express-validator";
import { ValidatorMiddleware } from "../middlewares/validator.middleware";


export class UserRoutes {
    
    static get routes() {
        const router = Router();        
        
        // Middlewares
        router.use([AuthMiddleware.validateToken, AuthMiddleware.authorizeRoles("admin")]);

        const userController = container.userController;
        
        // Routes
        router.post("/", 
            body("name").isString().withMessage("Invalid name"),
            body("email").isEmail().withMessage("Invalid email"),
            body("password").isLength({ min: 8 })
            .withMessage("La contraseña es muy corta, minimo 8 caracteres"),
            body("password_confirm").custom((value, { req }) => {
            if (value !== req.body.password) {
            throw new Error("Las contraseñas son diferentes");
            }
            return true;
            }),
            body("role").isString().withMessage("Invalid role").optional(),
            ValidatorMiddleware.validateRequest,
            userController.createUser
        );
        router.get("/", userController.getUsers);
        router.get("/:id", 
            param("id").isMongoId().withMessage("Invalid user id"),
            ValidatorMiddleware.validateRequest,
            userController.getUserById
        );
        router.put("/:id", 
            param("id").isMongoId().withMessage("Invalid user id"),
            body("name").isString().withMessage("Invalid name"),
            body("email").isEmail().withMessage("Invalid email"),
            body("role").isString().withMessage("Invalid role").optional(),
            body("password").isLength({ min: 8 })
            .withMessage("La contraseña es muy corta, minimo 8 caracteres").optional(),
            body("password_confirm").custom((value, { req }) => {
            if (value !== req.body.password) {
            throw new Error("Las contraseñas son diferentes");
            }
            return true;
            }),
            ValidatorMiddleware.validateRequest,
            userController.updateUser
        );
        router.delete("/:id", 
            param("id").isMongoId().withMessage("Invalid user id"),
            ValidatorMiddleware.validateRequest,
            userController.deleteUser
        );
        
        return router;
    }
}
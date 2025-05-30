import { Router } from "express";
import { container } from "../../config/di.container";
import { body, param } from "express-validator";
import { ValidatorMiddleware } from "../middlewares/validator.middleware";

export class AuthRoutes {
    
    static get routes() {
        const router = Router();
        const authController = container.authController;
        
        // Routes
        router.post("/login", 
            body("email").isEmail().withMessage("Invalid email"),
            body("password").isString().withMessage("Invalid password"),
            ValidatorMiddleware.validateRequest,
            authController.loginUser
        );
        router.get("/verify/:token",
            param("token").isString().withMessage("Invalid token"),
            ValidatorMiddleware.validateRequest,
            authController.verifyEmail
        );
        return router;
    }
}
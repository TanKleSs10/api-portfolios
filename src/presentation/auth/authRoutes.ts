import { Router } from "express";
import { container } from "../../config/di.container";

export class AuthRoutes {
    
    static get routes() {
        const router = Router();
        const authController = container.authController;
        
        // Routes
        router.post("/login", authController.loginUser);
        router.post("/verify/:token", );
        return router;
    }
}
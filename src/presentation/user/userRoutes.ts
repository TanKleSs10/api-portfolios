import { Router } from "express";
import { container } from "../../config/di.container";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class UserRoutes {
    
    static get routes() {
        const router = Router();        
        
        // Middlewares
        router.use([AuthMiddleware.validateToken, AuthMiddleware.authorizeRoles("admin")]);

        const userController = container.userController;
        
        // Routes
        router.post("/", userController.createUser);
        router.get("/", userController.getUsers);
        router.get("/:id", userController.getUserById);
        router.put("/:id", userController.updateUser);
        router.delete("/:id", userController.deleteUser);
        
        return router;
    }
}
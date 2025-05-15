import { Router } from "express";
import { container } from "../../config/di.container";

export class UserRoutes {
    
    static get routes() {
        const router = Router();        
        
        const userController = container.userController;
        
        // Routes
        router.get("/", userController.getUsers);
        router.get("/:id", userController.getUserById);
        router.post("/", userController.createUser);
        router.put("/:id", userController.updateUser);
        router.delete("/:id", userController.deleteUser);
        
        return router;
    }
}
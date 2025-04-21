import { Router } from "express";
import { UserController } from "./userController";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";
import { UserDataSourceImpl } from "../../infrastructure/datasources/user.datasource.impl";

export class UserRoutes {
    
    static get routes() {
        const router = Router();
        
        const userDataSource = new UserDataSourceImpl();
        const userRepository = new UserRepositoryImpl(userDataSource);
        const userController = new UserController(userRepository);
        
        router.get("/", userController.getUsers);
        router.get("/:id", userController.getUserById);
        router.post("/", userController.createUser);
        router.put("/:id", userController.updateUser);
        router.delete("/:id", userController.deleteUser);
        
        return router;
    }

}
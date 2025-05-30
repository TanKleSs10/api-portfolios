import { Router } from "express";
import { body, param } from "express-validator";
import rateLimit from 'express-rate-limit';
import { container } from "../../config/di.container";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ValidatorMiddleware } from "../middlewares/validator.middleware";
import { regularExps } from "../../config/regular-exp";

export class LeadRoutes {
    static get routes() {
        const router = Router();
        const apiLimiter = rateLimit({
            windowMs: 15 * 60 * 1000,
            max:5,
            message: 'Demasiadas solicitudes desde esta IP, por favor intenta nuevamente más tarde',
            standardHeaders: true, // Devuelve info de límites en headers
            legacyHeaders: false, // Desactiva headers obsoletos
        })
        
        const leadController = container.leadController;
        
        router.post("/quotation", 
            body("name")
                .isString().withMessage("Invalid name")
                .notEmpty().withMessage("Name is required")
                .trim()
                .isLength({ min: 2, max: 50 }).withMessage("Name must be between 2-50 characters"),
            body("email")
                .isEmail().withMessage("Invalid email")
                .normalizeEmail()
                .notEmpty().withMessage("Email is required"),
            body("description")
                .isString().withMessage("Invalid description")
                .notEmpty().withMessage("Description is required")
                .trim()
                .isLength({ min: 10, max: 500 }).withMessage("Description must be between 10-500 characters"),
            body("phone")
                .optional()
                .isString().withMessage("Invalid phone")
                .trim()
                .matches(regularExps.phone).withMessage("Invalid phone number format"),
            body("enterprise")
                .optional()
                .isString().withMessage("Invalid enterprise")
                .trim()
                .isLength({ max: 100 }).withMessage("Enterprise too long"),
            body("budget")
                .optional()
                .isNumeric().withMessage("Invalid budget")
                .toFloat()
                .isFloat({ min: 0 }).withMessage("Budget must be positive"),
                body("honeypot")
                .optional()
                .isEmpty().withMessage("Solicitud detectada como spam"), // Si viene con valor, es bot
            [ValidatorMiddleware.validateRequest,
            apiLimiter],
            leadController.createLead
        );
        
        router.get("/", 
            [AuthMiddleware.validateToken,
            AuthMiddleware.authorizeRoles("admin")],
            leadController.getLeads);
        
        router.get("/:id",
            param("id").isMongoId().withMessage("Invalid lead ID"),
            [AuthMiddleware.validateToken,
            AuthMiddleware.authorizeRoles("admin"),
            ValidatorMiddleware.validateRequest],
            leadController.getLeadById);


            router.put("/:id", 
                param("id").isMongoId().withMessage("Invalid lead ID"),
                body("name")
                    .optional()
                    .isString().withMessage("Invalid name")
                    .trim()
                    .isLength({ min: 2, max: 50 }).withMessage("Name must be between 2-50 characters"),
                body("email")
                    .optional()
                    .isEmail().withMessage("Invalid email")
                    .normalizeEmail(),
                ValidatorMiddleware.validateRequest,
                [AuthMiddleware.validateToken, AuthMiddleware.authorizeRoles("admin")],
                leadController.updateLead
            );
 
        router.delete("/:id", 
            param("id").isMongoId().withMessage("Invalid lead ID"),
            [AuthMiddleware.validateToken,
            AuthMiddleware.authorizeRoles("admin"),
            ValidatorMiddleware.validateRequest],
            leadController.deleteLead);

        return router;
    }
}
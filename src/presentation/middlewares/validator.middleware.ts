import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";

export class ValidatorMiddleware {
    static validateRequest(req: Request, res: Response, next: NextFunction): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({
                success: false,
                message: "Validation failed",
                errors: errors.array(),
            });
        }
        next();
    }
}
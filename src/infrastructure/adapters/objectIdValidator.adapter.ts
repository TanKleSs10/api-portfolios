import { Types } from "mongoose";

export class ObjectIdValidator {
    static isValid(id: string): boolean {
        try {
            return Types.ObjectId.isValid(id);
        } catch (error) {
            return false;
            
        }
    }
}
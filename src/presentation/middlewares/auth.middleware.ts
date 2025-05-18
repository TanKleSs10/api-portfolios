import { NextFunction, Request, Response } from 'express';
import { WinstonLogger } from '../../infrastructure/logger/winstonLogger.adapter';
import { JwtAdapter } from '../../infrastructure/adapters/jwt.adapter';
import { envs } from '../../config/envs';
import { userModel } from '../../infrastructure/models/user/userModel';
import { UserEntity } from '../../domain/entities/user.entity';

const logger = new WinstonLogger();
const jwt = new JwtAdapter(envs.JWT_SEED);

export class AuthMiddleware {
    static async validateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        const authorization = req.header('Authorization'); 
        if (!authorization || authorization === undefined) {
            res.status(401).json({
                success: false,
                message: 'Token not provided' 
            });
        }
        if(!authorization!.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                message: 'Invalid token format' 
            });
        }
        const token = authorization!.split(' ').at(1) || '';

        try {
            const payload = await jwt.verifyToken<{ id: string }>(token);
            if (!payload) {
            res.status(401).json({
                    success: false,
                    message: 'Invalid token'
                });
            }

            const user = await userModel.findById(payload!.id);
            if(!user) {
             res.status(401).json({
                success: false,
                message: 'Invalid token'
            });}

            req.body.user = UserEntity.fromObject(user);

            next();
        } catch (error) {
            logger.error(error as string);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                data: error
            });
        }
    }
}
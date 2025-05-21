import { Request, Response, NextFunction } from 'express';
import authService from "../service/auth-service"

const generateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await authService.generateAdmin();

        res.status(200).json({
            data: result
        });
        
    } catch (error) {
        next(error);
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await authService.login(req.body);
        
        console.log('testing check login ', req.body);
        

        res.status(200).json({
            data: result
        });
    } catch (error) {
        // console.log('testing ',error);
        next(error);
    }
}

export default {
    generateAdmin,
    login
}
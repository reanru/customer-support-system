import  jwt  from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.get('Authorization');

    if(!token){
        res.status(401).json({
            errors: "Require access token"
        });
    }

    try {
        jwt.verify(token ?? '', process.env.JWT_SECRET_KEY!);

        next();
    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized'
        })
    }    
}
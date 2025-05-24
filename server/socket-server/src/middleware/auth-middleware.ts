import  jwt, { JwtPayload }  from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
    user?: string | JwtPayload;
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.get('Authorization');

    if(!token){
        res.status(401).json({
            errors: "Require access token"
        });
        return
    }

    try {
        const user = jwt.verify(token ?? '', process.env.JWT_SECRET_KEY!);
        
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized'
        });
        return
    }    
}
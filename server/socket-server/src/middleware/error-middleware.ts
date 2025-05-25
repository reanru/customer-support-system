import { Request, Response, NextFunction } from 'express';
import { ResponseError } from "../_class/ResponseError"

const errorMiddleware = async (err: any, req: Request, res: Response, next: NextFunction) => {
    if(!err){
        next();
        return;
    }

    if(err instanceof ResponseError){
        res.status(err.status).json({
            message: err.message,
        });
    }
    // Can't be used because Joi doesn't support import module format
    // else if(errr instanceof ValidationError){
    //     res.status(400).json({
    //         errors: err.message
    //     }).end();
    // }
    else{
        res.status(500).json({
            errors: err.message,
        });
    }
}

export {
    errorMiddleware
}
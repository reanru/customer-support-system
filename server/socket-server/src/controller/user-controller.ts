import { Request, Response, NextFunction } from 'express';
import userService from "../service/user-service"

const get = async (req:any, res:any, next:any) => {
    try {
        const request = {
            search: req.query.search ?? "",
            page: Number(req.query.page),
            size: Number(req.query.size),
        }

        // console.log('check ', typeof request.page, typeof request.size);

        const result = await userService.get(request);

        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req.body;
        // console.log('testing create ',request);
        
        const result = await userService.create(request);

        res.status(200).json({
            data: result
        });
    } catch (error) {
        // console.log(error);
        next(error);
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const request = req.body;
        request.id = userId;

        // console.log("testing update ", request)

        const result = await userService.update(request);

        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;

        // console.log('testing remove ', userId)

        await userService.remove(userId);

        res.status(200).json({
            data: "OK"
        });
    } catch (error) {
        next(error);
    }
}

export default {
    get,
    create,
    update,
    remove
}
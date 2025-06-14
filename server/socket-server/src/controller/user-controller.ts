import { Request, Response, NextFunction } from 'express';
import userService from "../service/user-service"

import bcrypt from "bcrypt";

type User = {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
}

interface CustomRequest extends Request {
    user?: User;
}

const getProfile = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id ?? '';

        const result = await userService.getProfile(userId);
        
        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
}

const getList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = {
            search: typeof req.query.search === 'string' ? req.query.search : '',
            page: Number(req.query.page),
            size: Number(req.query.size),
        }

        // console.log('check ', typeof request.page, typeof request.size);

        const result = await userService.getList(request);

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
        request.password = await bcrypt.hash('agent123', 10);
        
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

        console.log('testing remove ', req.params)

        await userService.remove(userId);

        res.status(200).json({
            data: "OK"
        });
    } catch (error) {
        next(error);
    }
}

export default {
    getProfile,
    getList,
    create,
    update,
    remove
}
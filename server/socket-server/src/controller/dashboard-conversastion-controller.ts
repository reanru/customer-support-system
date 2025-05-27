import { Request, Response, NextFunction } from 'express';
import dashboaordConversationService from "../service/dashboard-conversation-service"

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

const getList = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const request = {
            agentId: req.user?.id ?? '',
            page: Number(req.query.page),
            size: Number(req.query.size),
        }

        // console.log('check ', request.page, typeof request.size);

        const result = await dashboaordConversationService.getList(request);

        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export default {
    getList,
}
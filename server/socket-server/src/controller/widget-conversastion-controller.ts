import { Request, Response, NextFunction } from 'express';
import widgetConversationService from "../service/widget-conversation-service"

const getDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const visitorId = req.params.visitorId;

        const result = await widgetConversationService.getDetail(visitorId);

        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export default {
    getDetail,
}
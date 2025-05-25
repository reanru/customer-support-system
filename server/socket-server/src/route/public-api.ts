import express from "express";

import authController from "../controller/auth-controller";
import widgetConversastionController from "../controller/widget-conversastion-controller";

const publicRouter = express.Router();

publicRouter.get('/', (req, res) => {
    res.send('Hello from Express + Prisma! Testing');
});

// AuthController
publicRouter.post('/api/users/generate-admin', authController.generateAdmin);
publicRouter.post('/api/users/login', authController.login);

// WidgetConversationController
publicRouter.get('/api/visitor/:visitorId', widgetConversastionController.getDetail);

export {
    publicRouter
}

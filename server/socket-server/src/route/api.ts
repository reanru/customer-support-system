import express from "express";

import { authMiddleware } from "../middleware/auth-middleware";
import userController from "../controller/user-controller";
import dashboardConversastionController from "src/controller/dashboard-conversastion-controller";

const router = express.Router();

router.use(authMiddleware);

// UserController
router.get('/api/users/profile', userController.getProfile);
router.get('/api/users', userController.getList);
router.post('/api/users', userController.create);
router.put('/api/users/:userId', userController.update);
router.delete('/api/users/:userId', userController.remove);

// DashboardConversationController
router.get('/api/dashboard/conversations', dashboardConversastionController.getList);

export {
    router
}

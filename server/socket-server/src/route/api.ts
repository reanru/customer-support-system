import express from "express";

import { authMiddleware } from "../middleware/auth-middleware";
import userController from "../controller/user-controller"

const router = express.Router();

router.use(authMiddleware);

router.get('/api/users', userController.get);
router.post('/api/users', userController.create);
router.put('/api/users/:userId', userController.update);
router.delete('/api/users/:userId', userController.remove);

export {
    router
}

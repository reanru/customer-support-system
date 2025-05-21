import express from "express";

import authController from "../controller/auth-controller";

const publicRouter = express.Router();

publicRouter.get('/', (req, res) => {
    res.send('Hello from Express + Prisma! Testing');
});

publicRouter.post('/api/users/generate-admin', authController.generateAdmin);

publicRouter.post('/api/users/login', authController.login);

export {
    publicRouter
}
